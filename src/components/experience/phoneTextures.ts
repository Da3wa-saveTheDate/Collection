/**
 * Canvas-drawn artwork for the procedural phone.
 *
 * SCREENS are the pages of the digital invitation shown on the phone; the
 * keyframes' `screen` value cross-fades between them (0 → 1 → 2). Every page
 * is drawn from the visitor's names, date and chosen design. The back
 * texture is the phone's frosted champagne glass with an engraved monogram.
 */
import * as THREE from 'three';
import type { ScreenContent } from './personalisation';

// Screen canvas matches the screen's proportions (1.30 × 2.84 world units).
export const SCREEN_W = 744;
export const SCREEN_H = 1624;
const SERIF = '"Playfair Display", Georgia, serif';
const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';
const MONO = '"DM Mono", ui-monospace, monospace';


type Ctx = CanvasRenderingContext2D;

function goldGradient(ctx: Ctx, x0 = 0, y0 = 0, x1 = SCREEN_W, y1 = SCREEN_H) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  ['#a37b45', '#e2c796', '#b88c52', '#ecd8ae', '#9c7440'].forEach((stop, index, all) => gradient.addColorStop(index / (all.length - 1), stop));
  return gradient;
}

function spaced(ctx: Ctx, text: string, x: number, y: number, spacing: number) {
  const context = ctx as Ctx & { letterSpacing?: string };
  if ('letterSpacing' in context) context.letterSpacing = `${spacing}px`;
  ctx.fillText(text, x + (ctx.textAlign === 'center' ? spacing / 2 : 0), y);
  if ('letterSpacing' in context) context.letterSpacing = '0px';
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Set `style(size)` on ctx, shrinking the size until `text` fits `maxWidth`. */
function fitFont(ctx: Ctx, text: string, style: (size: number) => string, size: number, maxWidth: number) {
  ctx.font = style(size);
  while (size > 20 && ctx.measureText(text).width > maxWidth) {
    size -= 4;
    ctx.font = style(size);
  }
}

/** Deterministic PRNG so paper grain is identical between redraws. */
function random(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
}

function paper(ctx: Ctx, width: number, height: number, tint: string, seed: number) {
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, width, height);
  const rand = random(seed);
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = rand() > 0.5 ? 'rgba(120, 90, 60, 0.045)' : 'rgba(255, 255, 255, 0.16)';
    ctx.fillRect(rand() * width, rand() * height, 1 + rand() * 2, 1 + rand() * 2);
  }
}

/** iOS-style status bar and dynamic island, so the screen reads as a real phone. */
function statusBar(ctx: Ctx, light: boolean) {
  ctx.fillStyle = light ? '#f6efe4' : '#1d1512';
  ctx.font = `600 30px ${SANS}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('9:41', 70, 62);
  // signal, battery
  for (let i = 0; i < 4; i++) ctx.fillRect(560 + i * 11, 70 - (i + 1) * 6, 7, (i + 1) * 6);
  roundRect(ctx, 616, 50, 50, 24, 7);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = ctx.fillStyle;
  ctx.stroke();
  roundRect(ctx, 620, 54, 36, 16, 4);
  ctx.fill();
  ctx.fillStyle = '#050505';
  roundRect(ctx, SCREEN_W / 2 - 110, 30, 220, 64, 32);
  ctx.fill();
}

function waxSeal(ctx: Ctx, cx: number, cy: number, radius: number, [light, dark]: [string, string]) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    const r = radius * (1 + 0.05 * Math.sin(angle * 5) + 0.03 * Math.sin(angle * 11 + 1.3));
    ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
  }
  const wax = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, 4, cx, cy, radius);
  wax.addColorStop(0, light);
  wax.addColorStop(1, dark);
  ctx.fillStyle = wax;
  ctx.shadowColor = 'rgba(40, 5, 10, 0.45)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = 'rgba(231, 207, 159, 0.75)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.74, 0, Math.PI * 2);
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `italic 400 ${radius * 1.1}px ${SERIF}`;
  ctx.fillStyle = 'rgba(30, 4, 8, 0.55)';
  ctx.fillText('A', cx + 3, cy + 8);
  ctx.fillStyle = '#e1c28d';
  ctx.fillText('A', cx, cy + 4);
}

/** Screen 0 — the sealed envelope that opens the invitation. */
function drawEnvelope(ctx: Ctx, content: ScreenContent) {
  const p = content.design.palette;
  paper(ctx, SCREEN_W, SCREEN_H, p.paper, 3);
  // Envelope flap: a soft V with a shadowed crease.
  const flapY = SCREEN_H * 0.52;
  ctx.fillStyle = 'rgba(120, 88, 58, 0.08)';
  ctx.beginPath();
  ctx.moveTo(0, SCREEN_H * 0.2);
  ctx.lineTo(SCREEN_W / 2, flapY);
  ctx.lineTo(SCREEN_W, SCREEN_H * 0.2);
  ctx.lineTo(SCREEN_W, 0);
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.strokeStyle = 'rgba(120, 88, 58, 0.28)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, SCREEN_H * 0.2);
  ctx.lineTo(SCREEN_W / 2, flapY);
  ctx.lineTo(SCREEN_W, SCREEN_H * 0.2);
  ctx.stroke();
  statusBar(ctx, false);

  ctx.textAlign = 'center';
  ctx.fillStyle = p.muted;
  ctx.font = `500 22px ${MONO}`;
  spaced(ctx, "YOU'RE INVITED", SCREEN_W / 2, SCREEN_H * 0.13, 8);
  ctx.fillStyle = p.ink;
  fitFont(ctx, content.names, size => `italic 400 ${size}px ${SERIF}`, 78, SCREEN_W - 120);
  ctx.fillText(content.names, SCREEN_W / 2, SCREEN_H * 0.2);

  waxSeal(ctx, SCREEN_W / 2, flapY, 118, p.seal);

  ctx.fillStyle = p.ink;
  ctx.font = `400 34px ${SERIF}`;
  ctx.fillText('A celebration of love', SCREEN_W / 2, SCREEN_H * 0.7);
  ctx.fillStyle = p.muted;
  ctx.font = `500 22px ${MONO}`;
  spaced(ctx, content.shortDate, SCREEN_W / 2, SCREEN_H * 0.745, 6);

  roundRect(ctx, SCREEN_W / 2 - 170, SCREEN_H * 0.84, 340, 84, 42);
  ctx.fillStyle = p.button;
  ctx.fill();
  ctx.fillStyle = '#f6efe4';
  ctx.font = `500 22px ${MONO}`;
  ctx.textBaseline = 'middle';
  spaced(ctx, 'TAP TO OPEN', SCREEN_W / 2, SCREEN_H * 0.84 + 43, 6);
}

/** Screen 1 — names, photo in an arch and a live countdown. */
function drawNames(ctx: Ctx, content: ScreenContent, photo: CanvasImageSource | null) {
  const p = content.design.palette;
  paper(ctx, SCREEN_W, SCREEN_H, p.paper, 11);
  const archX = 92;
  const archW = SCREEN_W - archX * 2;
  const archTop = 150;
  const archH = 640;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(archX, archTop + archW / 2);
  ctx.arc(SCREEN_W / 2, archTop + archW / 2, archW / 2, Math.PI, 0);
  ctx.lineTo(archX + archW, archTop + archH);
  ctx.lineTo(archX, archTop + archH);
  ctx.closePath();
  ctx.clip();
  if (photo) {
    // Photos in /public/experience are pre-cropped to exactly this 560 × 640 arch.
    ctx.drawImage(photo, archX, archTop, archW, archH);
  } else {
    const sky = ctx.createLinearGradient(0, archTop, 0, archTop + archH);
    sky.addColorStop(0, '#2b2350');
    sky.addColorStop(1, '#b07aa8');
    ctx.fillStyle = sky;
    ctx.fillRect(archX, archTop, archW, archH);
  }
  ctx.restore();
  ctx.strokeStyle = goldGradient(ctx);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(archX - 16, archTop + archW / 2);
  ctx.arc(SCREEN_W / 2, archTop + archW / 2, archW / 2 + 16, Math.PI, 0);
  ctx.lineTo(archX + archW + 16, archTop + archH + 16);
  ctx.lineTo(archX - 16, archTop + archH + 16);
  ctx.closePath();
  ctx.stroke();
  statusBar(ctx, true);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = p.muted;
  ctx.font = `500 20px ${MONO}`;
  spaced(ctx, 'TOGETHER WITH THEIR FAMILIES', SCREEN_W / 2, 872, 5);
  ctx.fillStyle = goldGradient(ctx, 0, 900, SCREEN_W, 1100);
  fitFont(ctx, content.names, size => `italic 400 ${size}px ${SERIF}`, 104, SCREEN_W - 110);
  ctx.fillText(content.names, SCREEN_W / 2, 972);
  ctx.fillStyle = p.ink;
  fitFont(ctx, content.longDate, size => `400 ${size}px ${SERIF}`, 32, SCREEN_W - 120);
  ctx.fillText(content.longDate, SCREEN_W / 2, 1060);

  // Live countdown to the visitor's date (or the sample date).
  const remaining = Math.max(0, content.event.getTime() - Date.now());
  const units = [
    [Math.floor(remaining / 864e5), 'DAYS'],
    [Math.floor(remaining / 36e5) % 24, 'HOURS'],
    [Math.floor(remaining / 6e4) % 60, 'MIN'],
  ] as const;
  units.forEach(([value, label], index) => {
    const x = SCREEN_W / 2 + (index - 1) * 190;
    roundRect(ctx, x - 78, 1140, 156, 150, 22);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fill();
    ctx.strokeStyle = p.muted;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = p.ink;
    ctx.font = `400 60px ${SERIF}`;
    ctx.fillText(String(value).padStart(2, '0'), x, 1200);
    ctx.fillStyle = p.muted;
    ctx.font = `500 18px ${MONO}`;
    spaced(ctx, label, x, 1256, 4);
  });

  roundRect(ctx, SCREEN_W / 2 - 200, 1370, 400, 84, 42);
  ctx.fillStyle = p.button;
  ctx.fill();
  ctx.fillStyle = '#f6efe4';
  ctx.font = `500 22px ${MONO}`;
  spaced(ctx, 'RSVP', SCREEN_W / 2, 1413, 8);
  ctx.fillStyle = p.muted;
  ctx.font = `italic 400 30px ${SERIF}`;
  ctx.fillText('ajwaa', SCREEN_W / 2, 1530);
}

/** Screen 2 — ceremony details, a stylised map and the reply buttons. */
function drawDetails(ctx: Ctx, content: ScreenContent) {
  const p = content.design.palette;
  paper(ctx, SCREEN_W, SCREEN_H, p.paper, 17);
  statusBar(ctx, false);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = p.muted;
  ctx.font = `500 20px ${MONO}`;
  spaced(ctx, 'THE DETAILS', SCREEN_W / 2, 190, 8);
  ctx.fillStyle = p.ink;
  ctx.font = `italic 400 76px ${SERIF}`;
  ctx.fillText('Join us', SCREEN_W / 2, 270);

  const rows = [['CEREMONY', '7:00 PM'], ['DINNER', '8:30 PM'], ['DRESS CODE', 'Black tie']];
  rows.forEach(([label, value], index) => {
    const y = 380 + index * 96;
    ctx.strokeStyle = 'rgba(184, 140, 82, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(90, y + 46);
    ctx.lineTo(SCREEN_W - 90, y + 46);
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillStyle = p.muted;
    ctx.font = `500 20px ${MONO}`;
    spaced(ctx, label, 90, y, 5);
    ctx.textAlign = 'right';
    ctx.fillStyle = p.ink;
    ctx.font = `400 36px ${SERIF}`;
    ctx.fillText(value, SCREEN_W - 90, y);
  });

  // Map card: river, streets and a pin.
  const mapY = 700;
  const mapH = 440;
  ctx.save();
  roundRect(ctx, 70, mapY, SCREEN_W - 140, mapH, 32);
  ctx.clip();
  ctx.fillStyle = '#ece0cc';
  ctx.fillRect(70, mapY, SCREEN_W - 140, mapH);
  ctx.strokeStyle = '#f8f1e6';
  ctx.lineWidth = 14;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(40, mapY + 60 + i * 95);
    ctx.lineTo(SCREEN_W, mapY + 20 + i * 110);
    ctx.stroke();
  }
  ctx.lineWidth = 10;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(140 + i * 150, mapY);
    ctx.lineTo(110 + i * 170, mapY + mapH);
    ctx.stroke();
  }
  ctx.strokeStyle = '#a9c3c9';
  ctx.lineWidth = 46;
  ctx.beginPath();
  ctx.moveTo(210, mapY - 20);
  ctx.bezierCurveTo(120, mapY + 160, 330, mapY + 260, 200, mapY + mapH + 20);
  ctx.stroke();
  ctx.restore();
  const pinX = SCREEN_W / 2 + 70;
  const pinY = mapY + 210;
  ctx.fillStyle = p.button;
  ctx.beginPath();
  ctx.arc(pinX, pinY - 34, 30, Math.PI, 0);
  ctx.lineTo(pinX, pinY + 20);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f6efe4';
  ctx.beginPath();
  ctx.arc(pinX, pinY - 36, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = p.ink;
  ctx.font = `400 38px ${SERIF}`;
  ctx.fillText('The Garden Terrace', SCREEN_W / 2, 1210);
  ctx.fillStyle = p.muted;
  ctx.font = `500 20px ${MONO}`;
  spaced(ctx, 'CAIRO · EGYPT', SCREEN_W / 2, 1260, 6);

  const buttonY = 1360;
  roundRect(ctx, 80, buttonY, 280, 84, 42);
  ctx.strokeStyle = p.button;
  ctx.lineWidth = 3;
  ctx.stroke();
  roundRect(ctx, SCREEN_W - 360, buttonY, 280, 84, 42);
  ctx.fillStyle = p.button;
  ctx.fill();
  ctx.font = `500 20px ${MONO}`;
  ctx.fillStyle = p.button;
  spaced(ctx, 'DIRECTIONS', 220, buttonY + 43, 4);
  ctx.fillStyle = '#f6efe4';
  spaced(ctx, 'ACCEPT', SCREEN_W - 220, buttonY + 43, 6);
}

/** Back glass: frosted champagne with an engraved monogram. */
function drawBack(ctx: Ctx) {
  const { width, height } = ctx.canvas;
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, '#f1e4d0');
  base.addColorStop(0.5, '#e6d3b8');
  base.addColorStop(1, '#d9c2a2');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);
  const rand = random(29);
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.14)' : 'rgba(110,80,50,0.04)';
    ctx.fillRect(rand() * width, rand() * height, 1.5, 1.5);
  }
  const cx = width / 2;
  const cy = height * 0.52;
  // Engraving: a dark cut with a light lip offset below it.
  for (const [offset, colour] of [[2, 'rgba(255,248,236,0.7)'], [0, 'rgba(120,88,52,0.55)']] as const) {
    ctx.strokeStyle = colour;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy + offset, 120, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = colour;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 400 150px ${SERIF}`;
    ctx.fillText('A', cx, cy + 6 + offset);
    ctx.font = `500 22px ${MONO}`;
    spaced(ctx, 'AJWAA', cx, height * 0.88 + offset, 12);
  }
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export type PhoneTextures = {
  screens: THREE.CanvasTexture[];
  back: THREE.CanvasTexture;
  /** Redraw every page, or only `pages` (e.g. [1] to tick the countdown). */
  redraw: (content: ScreenContent, photo: CanvasImageSource | null, pages?: number[]) => void;
  dispose: () => void;
};

export function createPhoneTextures(anisotropy: number, content: ScreenContent): PhoneTextures {
  const layers: Array<{ canvas: HTMLCanvasElement; draw: (ctx: Ctx, content: ScreenContent, photo: CanvasImageSource | null) => void }> = [
    { canvas: makeCanvas(SCREEN_W, SCREEN_H), draw: drawEnvelope },
    { canvas: makeCanvas(SCREEN_W, SCREEN_H), draw: drawNames },
    { canvas: makeCanvas(SCREEN_W, SCREEN_H), draw: drawDetails },
    { canvas: makeCanvas(700, 1440), draw: ctx => drawBack(ctx) },
  ];
  const textures = layers.map(({ canvas }) => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = anisotropy;
    return texture;
  });
  const redraw = (content: ScreenContent, photo: CanvasImageSource | null, pages?: number[]) => layers.forEach(({ canvas, draw }, index) => {
    if (pages && !pages.includes(index)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx, content, photo);
    textures[index].needsUpdate = true;
  });
  redraw(content, null);
  return {
    screens: textures.slice(0, 3),
    back: textures[3],
    redraw,
    dispose: () => textures.forEach(texture => texture.dispose()),
  };
}

let fontsReady: Promise<void> | null = null;

/** Fonts used on the screens (loaded once). */
export function loadScreenFonts() {
  fontsReady ??= 'fonts' in document
    ? Promise.all([
      document.fonts.load(`italic 400 100px ${SERIF}`, 'Laila & Omar A'),
      document.fonts.load(`400 36px ${SERIF}`, 'Saturday'),
      document.fonts.load(`600 30px ${SANS}`, '9:41'),
      document.fonts.load(`500 22px ${MONO}`, 'RSVP'),
    ]).then(() => undefined, () => undefined)
    : Promise.resolve();
  return fontsReady;
}

const photos = new Map<string, Promise<HTMLImageElement | null>>();

/** A design's screen photo, fetched on first use and cached for switching back. */
export function loadScreenPhoto(url: string) {
  let photo = photos.get(url);
  if (!photo) {
    photo = new Promise(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = url;
    });
    photos.set(url, photo);
  }
  return photo;
}
