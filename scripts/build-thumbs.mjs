/**
 * Builds the gallery thumbnails in public/thumbs/ from src/data/templates.json.
 *
 *   npm run thumbs
 *
 * Every design gets one small 3:4 WebP so the gallery loads quickly, whatever
 * size or format the original artwork is. The picture comes from, in order:
 *
 *   1. thumb-sources/<id>.webp — a phone screenshot of the live design, when
 *      one exists (drop a new screenshot there to change a thumbnail);
 *   2. a frame of the video, for video designs (needs ffmpeg on the PATH);
 *   3. the design's `image` in templates.json.
 *
 * Re-run after adding or changing a design.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const templates = JSON.parse(readFileSync(path.join(root, 'src/data/templates.json'), 'utf8'));
const outDir = path.join(root, 'public/thumbs');
const sourceDir = path.join(root, 'thumb-sources');
const WIDTH = 420;
const HEIGHT = 560;
/** Seconds into a video to take its poster frame from. */
const VIDEO_FRAME_AT = 3;

mkdirSync(outDir, { recursive: true });

let failed = 0;
for (const template of templates) {
  const source = path.join(root, 'public', template.image);
  const target = path.join(outDir, `${template.id}.webp`);
  try {
    const screenshot = path.join(sourceDir, `${template.id}.webp`);
    let input = existsSync(screenshot) ? screenshot : source;
    let frame;
    if (input === source && template.isVideo) {
      frame = path.join(tmpdir(), `ajwaa-thumb-${template.id}.png`);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(VIDEO_FRAME_AT), '-i', source, '-frames:v', '1', frame]);
      input = frame;
    }
    await sharp(input).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' }).webp({ quality: 76 }).toFile(target);
    if (frame) rmSync(frame, { force: true });
    console.log(`ok    ${template.id}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL  ${template.id}: ${error.message}`);
  }
}

if (failed) {
  console.error(`\n${failed} thumbnail(s) could not be built.`);
  process.exit(1);
}
console.log(`\n${templates.length} thumbnails written to public/thumbs/`);
