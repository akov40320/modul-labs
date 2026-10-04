import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(project, 'app');
const destination = resolve(project, 'dist');
if (destination !== resolve(project, 'dist')) throw new Error('Unexpected output directory');
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
async function countFiles(directory) {
  let count = 0;
  for (const name of await readdir(directory)) {
    const path = resolve(directory, name);
    count += (await stat(path)).isDirectory() ? await countFiles(path) : 1;
  }
  return count;
}
process.stdout.write(`Build complete: ${await countFiles(destination)} files in dist/\n`);
