import { contrastRatio, type RGB } from '../../../packages/editor-view/contrast';
export function checkVisibleContrast(): {
  passed: boolean;
  checked: number;
  minimum: number;
  failures: { tag: string; className: string; ratio: number }[];
} {
  const parse = (color: string): [number, number, number, number] => {
    const n = color.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
    return [n[0]!, n[1]!, n[2]!, n[3] ?? 1];
  };
  const background = (el: Element | null): RGB => {
    if (!el) return [245, 242, 237];
    const c = parse(getComputedStyle(el).backgroundColor);
    if (c[3] === 1) return c.slice(0, 3) as RGB;
    const below = background(el.parentElement);
    return below.map((v, i) => c[i]! * c[3] + v * (1 - c[3])) as RGB;
  };
  const failures: { tag: string; className: string; ratio: number }[] = [];
  let checked = 0;
  let minimum = 21;
  for (const el of document.querySelectorAll<HTMLElement>('.studio *,[role="dialog"] *')) {
    if (
      ![
        'BUTTON',
        'INPUT',
        'SELECT',
        'LABEL',
        'P',
        'SMALL',
        'H1',
        'H2',
        'H3',
        'OUTPUT',
        'SPAN',
        'STRONG',
        'DT',
        'DD',
        'SUMMARY',
        'LI',
      ].includes(el.tagName) ||
      el.closest('[hidden],[inert],[aria-hidden="true"],button:disabled') ||
      !el.getClientRects().length ||
      ![...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
    )
      continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden') continue;
    const text = parse(style.color);
    const bg = el.closest('.character-panel') ? ([70, 55, 80] as RGB) : background(el);
    const fg = bg.map((v, i) => text[i]! * text[3] + v * (1 - text[3])) as RGB;
    const ratio = contrastRatio(fg, bg);
    checked++;
    minimum = Math.min(minimum, ratio);
    const large =
      parseFloat(style.fontSize) >= 24 ||
      (parseFloat(style.fontSize) >= 18.67 && Number(style.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5))
      failures.push({ tag: el.tagName, className: el.className, ratio });
  }
  return { passed: checked > 0 && failures.length === 0, checked, minimum, failures };
}
