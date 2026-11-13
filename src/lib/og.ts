// Social cards, drawn as SVG and rasterised with sharp at build time.
// Dark on purpose: a preview image does not follow the theme of the page.

import sharp from 'sharp';

const esc = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const wrap = (text: string, max: number, maxLines = 2) => {
  const all: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      all.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) all.push(line);
  if (all.length <= maxLines) return all;
  return [...all.slice(0, maxLines - 1), `${all[maxLines - 1].replace(/[.,;:]$/, '')}…`];
};

export interface OgProject {
  name: string;
  accent: string;
  oneLiner: string;
  fact?: { value: string; label: string };
  stack: string[];
}

export function projectSvg(project: OgProject, areaLabel: string): string {
  const lines = wrap(project.oneLiner, 46, 2);
  const stack = project.stack.slice(0, 4).join(' · ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.75">
      <stop offset="0" stop-color="${project.accent}" stop-opacity="0.42"/>
      <stop offset="0.55" stop-color="${project.accent}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${project.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#07070c"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>

  <text x="72" y="98" fill="#b7b5c8" font-family="Cascadia Code, Consolas, monospace" font-size="22" letter-spacing="2">ibai.d.oronoz</text>
  <text x="1128" y="98" text-anchor="end" fill="${project.accent}" font-family="Cascadia Code, Consolas, monospace" font-size="20" letter-spacing="2">${esc(areaLabel.toUpperCase())}</text>

  <text x="72" y="238" fill="#f2f1f7" font-family="Segoe UI, system-ui, sans-serif" font-size="64" font-weight="700" letter-spacing="-1.5">${esc(project.name)}</text>

  ${lines
    .map(
      (line, i) =>
        `<text x="72" y="${300 + i * 42}" fill="#b7b5c8" font-family="Segoe UI, system-ui, sans-serif" font-size="28">${esc(line)}</text>`,
    )
    .join('\n  ')}

  ${
    project.fact
      ? `<text x="72" y="486" fill="#ffffff" font-family="Segoe UI, system-ui, sans-serif" font-size="104" font-weight="800" letter-spacing="-3">${esc(project.fact.value)}</text>
  <text x="72" y="526" fill="#8b88a3" font-family="Cascadia Code, Consolas, monospace" font-size="22">${esc(project.fact.label)}</text>`
      : ''
  }

  <text x="72" y="588" fill="#6f6c85" font-family="Cascadia Code, Consolas, monospace" font-size="20">${esc(stack)}</text>
  <text x="1128" y="588" text-anchor="end" fill="#6f6c85" font-family="Cascadia Code, Consolas, monospace" font-size="20">ibaidoronoz.github.io</text>
</svg>`;
}

export interface OgHome {
  kicker: string;
  name: string;
  role: string;
  focus: string;
  lines: string[];
  location: string;
}

export function homeSvg(copy: OgHome): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4f6bff"/>
      <stop offset="0.5" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#e04fb8"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.1" r="0.8">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#07070c"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>

  <text x="72" y="110" fill="#b7b5c8" font-family="Cascadia Code, Consolas, monospace" font-size="22" letter-spacing="3">${esc(copy.kicker)}</text>
  <text x="72" y="260" fill="url(#grad)" font-family="Segoe UI, system-ui, sans-serif" font-size="86" font-weight="800" letter-spacing="-2">${esc(copy.name)}</text>
  <text x="72" y="330" fill="#f2f1f7" font-family="Segoe UI, system-ui, sans-serif" font-size="34">${esc(copy.role)} — ${esc(copy.focus)}</text>
  ${copy.lines
    .map(
      (line, i) =>
        `<text x="72" y="${392 + i * 36}" fill="#b7b5c8" font-family="Segoe UI, system-ui, sans-serif" font-size="24">${esc(line)}</text>`,
    )
    .join('\n  ')}

  <circle cx="78" cy="556" r="5" fill="#34d399"/>
  <text x="96" y="563" fill="#8b88a3" font-family="Cascadia Code, Consolas, monospace" font-size="20">ibaidoronoz.github.io</text>
  <text x="1128" y="563" text-anchor="end" fill="#6f6c85" font-family="Cascadia Code, Consolas, monospace" font-size="20">${esc(copy.location)}</text>
</svg>`;
}

export async function svgToPng(svg: string): Promise<Response> {
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
