import { normalized } from '../tools/format-ast.mjs';
// Readability changes are accepted only when the parsed program stays identical.
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
  createWriteStream,
} from 'node:fs';
import { resolve, relative, join, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { ZipFile } from 'yazl';

const root = resolve('.'),
  out = resolve(process.argv[2] ?? 'evidence/cleanup/format-01');
if (
  !out.startsWith(resolve('evidence/cleanup') + '/') &&
  !out.startsWith(resolve('evidence/cleanup') + '\\')
)
  throw Error('E_FORMAT_OUTPUT');
if (existsSync(out)) throw Error('E_FORMAT_EXISTS');
mkdirSync(out, { recursive: true });
const prettier = await import(
  pathToFileURL(resolve('.local/format-tools/node_modules/prettier/index.mjs')).href
);
const config = JSON.parse(readFileSync('.prettierrc.json', 'utf8'));
const python = resolve('.venv-product/Scripts/python.exe');
const wanted = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.py', '.css', '.html']);
const files = [];
function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw Error('E_FORMAT_LINK');
    const path = join(folder, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__pycache__' && entry.name !== 'fixtures') walk(path);
    } else if (wanted.has(extname(path)) && !/\.(generated\.|runtime\.(js|d\.ts)$)/.test(path))
      files.push(path);
  }
}
for (const folder of ['apps', 'packages', 'worker', 'scripts', 'tools', 'tests'])
  walk(resolve(folder));
for (const name of ['forge.config.cjs', 'vite.config.mjs'])
  if (existsSync(name)) files.push(resolve(name));
const hash = (data) => createHash('sha256').update(data).digest('hex');
const baseArgument = process.argv.find((arg) => arg.startsWith('--since='))?.slice(8);
const baseFile = baseArgument ? resolve(baseArgument) : null;
let baseHashes = new Map();
let cursor = baseFile;
const visitedBases = new Set();
while (cursor) {
  if (
    !cursor.startsWith(resolve('evidence/cleanup') + sep) ||
    visitedBases.has(cursor) ||
    visitedBases.size >= 32
  )
    throw Error('E_FORMAT_BASE');
  visitedBases.add(cursor);
  const base = JSON.parse(readFileSync(cursor, 'utf8'));
  if (base.astDifferencesRetained || base.parserLimitsRetained) throw Error('E_FORMAT_BASE');
  for (const row of base.files)
    if (!baseHashes.has(row.file)) baseHashes.set(row.file, row.afterSha256);
  cursor = base.baseReport ? resolve(root, base.baseReport) : null;
}
const originals = files
  .map((file) => ({
    file,
    relative: relative(root, file).replaceAll('\\', '/'),
    bytes: readFileSync(file),
  }))
  .filter((row) => baseHashes.get(row.relative) !== hash(row.bytes));
const zip = new ZipFile();
for (const row of originals) zip.addBuffer(row.bytes, row.relative);
await new Promise((yes, no) => {
  const dest = createWriteStream(join(out, 'source-before.zip'), { flags: 'wx' });
  zip.outputStream.pipe(dest);
  zip.outputStream.on('error', no);
  dest.on('error', no);
  dest.on('finish', yes);
  zip.end();
});
async function jsAst(text, file) {
  const { ast } = await prettier.__debug.parse(text, { filepath: file, ...config });
  return hash(JSON.stringify(normalized(ast)));
}
function pyAst(text) {
  const result = spawnSync(python, ['-I', 'scripts/python-ast.py'], {
    input: text,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 30000,
  });
  if (result.status !== 0) throw Error('E_FORMAT_PYTHON_AST');
  return result.stdout.trim();
}
const result = [];
for (const [index, row] of originals.entries()) {
  const before = row.bytes.toString('utf8'),
    extension = extname(row.file);
  let after,
    astBefore = null,
    astAfter = null,
    status = 'unchanged';
  try {
    if (extension === '.py') {
      astBefore = pyAst(before);
      const formatted = spawnSync(
        python,
        [
          '-I',
          '-m',
          'ruff',
          'format',
          '--stdin-filename',
          row.file,
          '--config',
          'line-length=100',
          '--config',
          "format.quote-style='single'",
          '-',
        ],
        { input: before, encoding: 'utf8', windowsHide: true, timeout: 30000 },
      );
      if (formatted.status !== 0) throw Error('E_FORMAT_RUFF');
      after = formatted.stdout;
      astAfter = pyAst(after);
    } else {
      if (!['.css', '.html'].includes(extension)) astBefore = await jsAst(before, row.file);
      after = await prettier.format(before, { filepath: row.file, ...config });
      if (astBefore) astAfter = await jsAst(after, row.file);
    }
    if (astBefore && astBefore !== astAfter) {
      status = 'retained-original-ast-difference';
      after = before;
    } else if (after !== before) {
      writeFileSync(row.file, after, 'utf8');
      status = 'formatted';
    }
  } catch {
    status = 'retained-original-parser-limit';
    after = before;
  }
  result.push({
    file: row.relative,
    status,
    beforeSha256: hash(row.bytes),
    afterSha256: hash(Buffer.from(after ?? before)),
    astBefore,
    astAfter,
  });
  if ((index + 1) % 100 === 0) console.log('Readability review: ' + (index + 1) + ' files');
}
writeFileSync(
  join(out, 'format.json'),
  JSON.stringify(
    {
      files: result,
      baseReport: baseFile ? relative(root, baseFile).replaceAll('\\', '/') : null,
      unchangedSinceBase: files.length - originals.length,
      configurationMustMatchBase: !!baseFile,
      formatted: result.filter((r) => r.status === 'formatted').length,
      astDifferencesRetained: result.filter((r) => r.status === 'retained-original-ast-difference')
        .length,
      parserLimitsRetained: result.filter((r) => r.status === 'retained-original-parser-limit')
        .length,
      historicalFilesModified: false,
      dependenciesOrGeneratedCodeFormatted: false,
    },
    null,
    2,
  ) + '\n',
  { flag: 'wx' },
);
console.log('Readability formatting complete; parsed-program differences retained unchanged.');
