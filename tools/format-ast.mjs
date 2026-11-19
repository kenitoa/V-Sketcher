// Position-independent program comparison for readability-only edits.
const ignored = new Set([
  'loc',
  'range',
  'start',
  'end',
  'comments',
  'leadingComments',
  'trailingComments',
  'innerComments',
  'tokens',
  'extra',
  'parent',
]);
function jsxText(text) {
  const lines = text.split(/\r\n|\n|\r/);
  let last = 0;
  for (let i = 0; i < lines.length; i++) if (/[^ \t]/.test(lines[i])) last = i;
  let result = '';
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replaceAll('\t', ' ');
    if (i) line = line.replace(/^ +/, '');
    if (i !== lines.length - 1) line = line.replace(/ +$/, '');
    if (line) result += line + (i !== last ? ' ' : '');
  }
  return result;
}
export function normalized(value) {
  if (Array.isArray(value)) return value.map(normalized);
  if (!value || typeof value !== 'object') return typeof value === 'bigint' ? String(value) : value;
  if (value.type === 'ParenthesizedExpression') return normalized(value.expression);
  if (value.type === 'TSParenthesizedType') return normalized(value.typeAnnotation);
  const result = {};
  for (const key of Object.keys(value).sort()) {
    if (
      key.startsWith('__') ||
      ignored.has(key) ||
      (key === 'raw' && ['Literal', 'JSXText'].includes(value.type))
    )
      continue;
    if (
      key === 'key' &&
      !value.computed &&
      [
        'Property',
        'ObjectProperty',
        'ObjectMethod',
        'MethodDefinition',
        'PropertyDefinition',
        'ClassMethod',
        'ClassProperty',
        'TSPropertySignature',
        'TSMethodSignature',
      ].includes(value.type)
    ) {
      if (
        value.key.type === 'Identifier' ||
        (['Literal', 'StringLiteral'].includes(value.key.type) &&
          typeof value.key.value === 'string')
      ) {
        result.key = {
          propertyName: value.key.type === 'Identifier' ? value.key.name : value.key.value,
        };
        continue;
      }
    }
    if (key === 'children' && ['JSXElement', 'JSXFragment'].includes(value.type)) {
      const children = [];
      for (const child of value.children) {
        const literal =
          child.type === 'JSXExpressionContainer' &&
          ['Literal', 'StringLiteral'].includes(child.expression.type) &&
          typeof child.expression.value === 'string';
        const text =
          child.type === 'JSXText' ? jsxText(child.value) : literal ? child.expression.value : null;
        if (text !== null) {
          if (!text) continue;
          const previous = children.at(-1);
          if (previous?.type === 'JSXText') previous.value += text;
          else children.push({ type: 'JSXText', value: text });
        } else if (!(
          child.type === 'JSXExpressionContainer' && child.expression.type === 'JSXEmptyExpression'
        )) {
          children.push(normalized(child));
        }
      }
      result.children = children;
      continue;
    }
    result[key] =
      value.type === 'JSXText' && key === 'value' ? jsxText(value[key]) : normalized(value[key]);
  }
  return result;
}
