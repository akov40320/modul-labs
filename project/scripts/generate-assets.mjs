import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Original SVG geometry, generated locally. No photographs or third-party graphics.
const directory = resolve(dirname(fileURLToPath(import.meta.url)), '../app/assets');
await mkdir(directory, { recursive: true });
const colors = {
  blue: ['#426bd1', '#173fa9', '#102d7c', '#6286dd'],
  red: ['#f36e50', '#e34b36', '#b72e27', '#ff9970'],
  yellow: ['#ffe26c', '#edc735', '#c69e25', '#fff09d'],
  cream: ['#f4f0e2', '#d9d6c9', '#bcb9ad', '#fffdf5'],
};
function composition(width, height, size, cx, cy, blocks, title) {
  const p = (x, y, z) => [cx + (x - y) * size, cy + (x + y) * size * 0.5 - z * size];
  const pts = (points) => points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  function brick({ x, y, z, w, d, h, color }) {
    const [top, front, side, highlight] = colors[color];
    const a = p(x, y, z + h); const b = p(x + w, y, z + h); const c = p(x + w, y + d, z + h); const e = p(x, y + d, z + h);
    const bb = p(x + w, y, z); const cc = p(x + w, y + d, z); const ee = p(x, y + d, z);
    let output = `<g stroke-linejoin="round"><polygon points="${pts([e, c, cc, ee])}" fill="${front}" stroke="${front}"/><polygon points="${pts([b, c, cc, bb])}" fill="${side}" stroke="${side}"/><polygon points="${pts([a, b, c, e])}" fill="${top}" stroke="${top}"/><polyline points="${pts([e, c, b])}" fill="none" stroke="${highlight}" stroke-width="1.3" opacity=".55"/>`;
    const rx = size * 0.30; const ry = size * 0.145; const studHeight = size * 0.12;
    for (let v = 0.5; v < d; v += 1) {
      for (let u = 0.5; u < w; u += 1) {
        const [sx, sy] = p(x + u, y + v, z + h);
        output += `<path d="M ${(sx-rx).toFixed(2)} ${(sy-studHeight).toFixed(2)} v ${studHeight.toFixed(2)} a ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 0 ${(2*rx).toFixed(2)} 0 v ${(-studHeight).toFixed(2)}" fill="${front}"/><ellipse cx="${sx.toFixed(2)}" cy="${(sy-studHeight).toFixed(2)}" rx="${rx.toFixed(2)}" ry="${ry.toFixed(2)}" fill="${highlight}"/><ellipse cx="${sx.toFixed(2)}" cy="${(sy-studHeight).toFixed(2)}" rx="${(rx*.8).toFixed(2)}" ry="${(ry*.72).toFixed(2)}" fill="${top}" opacity=".5"/>`;
      }
    }
    return output + '</g>';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title><defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="14" stdDeviation="10" flood-color="#14213d" flood-opacity=".14"/></filter></defs><ellipse cx="${cx}" cy="${cy+size*.8}" rx="${size*3.3}" ry="${size*.7}" fill="#17233a" opacity=".06"/><g filter="url(#shadow)">${blocks.map(brick).join('')}</g></svg>\n`;
}
const hero = [
  { x: -2.1, y: -.4, z: 0, w: 5, d: 3, h: .72, color: 'red' },
  { x: -1.8, y: -.2, z: .72, w: 2, d: 2, h: 2.15, color: 'blue' },
  { x: .8, y: -.2, z: .72, w: 2, d: 2, h: 1.3, color: 'yellow' },
  { x: -1.8, y: -.2, z: 2.87, w: 4, d: 2, h: .82, color: 'blue' },
  { x: -.8, y: -.2, z: 3.69, w: 2, d: 2, h: .62, color: 'yellow' },
  { x: 2.6, y: 2.6, z: 0, w: 2, d: 1, h: .7, color: 'yellow' },
  { x: -2.7, y: 2.7, z: 0, w: 1, d: 1, h: .55, color: 'blue' },
  { x: 2.8, y: -1.65, z: 0, w: 1, d: 1, h: .55, color: 'cream' },
];
await writeFile(resolve(directory, 'hero.svg'), composition(720, 700, 57, 355, 520, hero, 'Композиция из модульных блоков'), 'utf8');
for (const color of ['blue', 'red', 'yellow']) {
  const other = color === 'yellow' ? 'blue' : 'yellow';
  const blocks = [
    { x: -1.6, y: -.8, z: 0, w: 3, d: 2, h: .65, color },
    { x: -.6, y: -.8, z: .65, w: 2, d: 2, h: .8, color },
    { x: -.6, y: -.8, z: 1.45, w: 2, d: 1, h: .6, color: other },
    { x: 1.65, y: 1.45, z: 0, w: 1, d: 1, h: .55, color: color === 'red' ? 'blue' : 'red' },
  ];
  await writeFile(resolve(directory, `blocks-${color}.svg`), composition(420, 280, 40, 210, 175, blocks, 'Модульные строительные элементы'), 'utf8');
}
process.stdout.write('Generated 4 original SVG illustrations\n');
