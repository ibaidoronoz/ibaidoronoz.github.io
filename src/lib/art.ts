// Deterministic abstract art: a flow field seeded by the project id. No dependencies, no
// client JS. The same project always draws the same lines.

const hash = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export function fieldSvg(id: string, accent: string): string {
  const rand = mulberry32(hash(id));
  const width = 400;
  const height = 250;
  const lines = 30;

  const phase = rand() * Math.PI * 2;
  const fx = 0.8 + rand() * 0.9;
  const fy = 0.7 + rand() * 1.1;
  const amp = 0.85 + rand() * 0.9;

  const angle = (x: number, y: number) =>
    Math.sin((x / width) * fx * 6 + phase) * amp + Math.cos((y / height) * fy * 5 + phase * 1.7) * amp;

  const paths: string[] = [];

  for (let i = 0; i < lines; i += 1) {
    let x = rand() * width;
    let y = rand() * height;
    let d = `M${Math.round(x)} ${Math.round(y)}`;

    for (let step = 0; step < 10; step += 1) {
      const a = angle(x, y) * Math.PI;
      const len = 10 + rand() * 7;
      x += Math.cos(a) * len;
      y += Math.sin(a) * len * 0.7;
      if (x < -30 || x > width + 30 || y < -30 || y > height + 30) break;
      d += `L${Math.round(x)} ${Math.round(y)}`;
    }

    const opacity = (0.12 + rand() * 0.3).toFixed(2);
    const weight = (1.1 + rand() * 0.9).toFixed(1);
    paths.push(
      `<path d="${d}" fill="none" stroke="${accent}" stroke-width="${weight}" stroke-opacity="${opacity}" stroke-linecap="round"/>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
<defs>
<radialGradient id="fade" cx="0.78" cy="0.62" r="0.72">
<stop offset="0" stop-color="#fff"/>
<stop offset="0.7" stop-color="#fff" stop-opacity="0.4"/>
<stop offset="1" stop-color="#fff" stop-opacity="0"/>
</radialGradient>
<mask id="mask"><rect width="${width}" height="${height}" fill="url(#fade)"/></mask>
</defs>
<g mask="url(#mask)">${paths.join('')}</g>
</svg>`;
}
