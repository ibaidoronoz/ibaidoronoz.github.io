import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { AREAS } from '../../data/taxonomy';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { id: project.id }, props: { project: project.data } }));
}) satisfies GetStaticPaths;

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

export const GET: APIRoute = async ({ props }) => {
  const project = props.project as {
    name: string;
    accent: string;
    oneLiner: string;
    fact?: { value: string; label: string };
    stack: string[];
    areas: string[];
  };

  const area = project.areas[0] ? AREAS[project.areas[0] as keyof typeof AREAS] : '';
  const lines = wrap(project.oneLiner, 46, 2);
  const stack = project.stack.slice(0, 4).join(' · ');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
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
  <text x="1128" y="98" text-anchor="end" fill="${project.accent}" font-family="Cascadia Code, Consolas, monospace" font-size="20" letter-spacing="2">${esc(area.toUpperCase())}</text>

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

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
