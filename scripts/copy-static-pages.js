import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const foldersToCopy = [
  'archives',
  'backup',
  'css',
  'default-index',
  'grid_master',
  'images',
  'insurance_fraud',
  'interstellar_drive',
  'interstellar_drive_final',
  'js',
  'resume',
  'the_dinner',
  'ue5_ai_material',
  'ue5_screenshot'
];

await mkdir('dist', { recursive: true });

for (const folder of foldersToCopy) {
  if (!existsSync(folder)) continue;
  const target = `dist/${folder}`;
  await rm(target, { recursive: true, force: true });
  await cp(folder, target, { recursive: true });
}