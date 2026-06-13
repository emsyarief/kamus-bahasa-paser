import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const file = existsSync('data/entries.json') ? 'data/entries.json' : 'data/entries.sample.json';
const data = JSON.parse(await readFile(file, 'utf8'));

if (!Array.isArray(data)) throw new Error(`${file} must contain a JSON array`);

for (const [index, entry] of data.entries()) {
  if (!entry || typeof entry !== 'object') throw new Error(`Entry ${index} must be an object`);
  if (!entry.headword || typeof entry.headword !== 'string') throw new Error(`Entry ${index} missing string headword`);
  if (!Array.isArray(entry.translations)) throw new Error(`Entry ${index} missing translations array`);
}

console.log(`OK: ${data.length} entries validated from ${file}`);
