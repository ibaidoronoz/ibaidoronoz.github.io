import type { APIRoute } from 'astro';
import { site } from '../../data/site';
import sharp from 'sharp';

const esc = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const GET: APIRoute = async () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
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

  <text x="72" y="110" fill="#b7b5c8" font-family="Cascadia Code, Consolas, monospace" font-size="22" letter-spacing="3">PAYMENTS × AI AGENTS</text>
  <text x="72" y="260" fill="url(#grad)" font-family="Segoe UI, system-ui, sans-serif" font-size="86" font-weight="800" letter-spacing="-2">${esc(site.name)}</text>
  <text x="72" y="330" fill="#f2f1f7" font-family="Segoe UI, system-ui, sans-serif" font-size="34">${esc(site.role)} — ${esc(site.focus)}</text>
  <text x="72" y="392" fill="#b7b5c8" font-family="Segoe UI, system-ui, sans-serif" font-size="24">Ten years building payment systems where errors cost money.</text>
  <text x="72" y="428" fill="#b7b5c8" font-family="Segoe UI, system-ui, sans-serif" font-size="24">Now I design how engineering teams ship with AI agents.</text>

  <circle cx="78" cy="556" r="5" fill="#34d399"/>
  <text x="96" y="563" fill="#8b88a3" font-family="Cascadia Code, Consolas, monospace" font-size="20">ibaidoronoz.github.io</text>
  <text x="1128" y="563" text-anchor="end" fill="#6f6c85" font-family="Cascadia Code, Consolas, monospace" font-size="20">Basque Country, Spain</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
