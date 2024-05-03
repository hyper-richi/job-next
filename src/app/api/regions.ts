import { promises as fs } from 'fs';

export async function get() {
  const path = process.cwd() + '/src/app/data/regions.json';
  const file = await fs.readFile(path, 'utf8');
  const data = JSON.parse(file);
  return data;
}
