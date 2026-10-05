import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { YANDEX_FORM_URL } from '../app/service-config.js';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let checks = 0;
const fail = (message) => { throw new Error(message); };
async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path)); else files.push(path);
  }
  return files;
}
for (const directory of ['app', 'scripts', 'tests']) {
  for (const file of await walk(resolve(project, directory))) {
    const source = await readFile(file, 'utf8');
    if (source.includes('\uFFFD')) fail(`Invalid UTF-8 replacement character: ${file}`);
    if (['.js', '.mjs'].includes(extname(file))) {
      const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
      if (result.status !== 0) fail(result.stderr || `Syntax check failed: ${file}`);
      checks += 1;
    }
  }
}
const app = resolve(project, 'app');
const html = await readFile(resolve(app, 'index.html'), 'utf8');
if (!/^<!doctype html>/i.test(html) || !html.includes('lang="ru"')) fail('Missing HTML doctype or language');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) fail('Duplicate HTML id');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(?:mailto:|https?:)/.test(match[1])) continue;
  const path = resolve(app, match[1]);
  if (!path.startsWith(app)) fail(`Unexpected asset path: ${match[1]}`);
  await access(path); checks += 1;
}
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) fail(`Broken section link: ${match[1]}`);
  checks += 1;
}
const main = await readFile(resolve(app, 'main.js'), 'utf8');
for (const match of main.matchAll(/\bfrom\s+['"](\.\/[^'"]+)['"]/g)) {
  await access(resolve(app, match[1])); checks += 1;
}
if (YANDEX_FORM_URL !== '') {
  const formURL = new URL(YANDEX_FORM_URL);
  if (formURL.protocol !== 'https:' || formURL.hostname !== 'forms.yandex.ru' || formURL.username || formURL.password) fail('Use the public HTTPS URL from Yandex Forms');
}
checks += 1;
for (const match of main.matchAll(/\$\(['"]#([a-z][a-z0-9-]*)['"]\)/gi)) {
  if (!ids.includes(match[1])) fail(`Missing DOM element #${match[1]}`);
  checks += 1;
}
for (const color of ['blue', 'red', 'yellow']) {
  await access(resolve(app, 'assets', `blocks-${color}.svg`)); checks += 1;
}
const css = await readFile(resolve(app, 'styles.css'), 'utf8');
if ([...css].filter((char) => char === '{').length !== [...css].filter((char) => char === '}').length) fail('Unbalanced CSS braces');
if (/https?:\/\//.test(css)) fail('Styles must work without remote resources');
checks += 1;
process.stdout.write(`Lint passed: ${checks} syntax, asset, DOM and structural checks\n`);
