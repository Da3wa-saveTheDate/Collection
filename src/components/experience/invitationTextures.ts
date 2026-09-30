/**
 * Canvas-drawn textures for the procedural invitation.
 *
 * Every artwork is drawn twice: once in colour, and once as a "surface" map
 * where green = roughness and blue = metalness (the channels three.js reads
 * from roughnessMap / metalnessMap). That lets the gold foil catch the key
 * light as the card turns while the paper stays soft and matte.
 */
import * as THREE from 'three';

// Canvas size matches the card's 2 × 3 proportions.
const W = 1024;
const H = 1536;
const SERIF = '"Playfair Display", Georgia, serif';
const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';

type Mode = 'color' | 'surface';

const PAPER = '#f5ede0';
const INK = '#3a2a22';
const GOLD_STOPS = ['#a37b45', '#e7cf9f', '#b88c52', '#f1dfb8', '#9c7440'];
// Surface channels: paper is rough & dielectric, foil is glossy & metallic.
const SURFACE_PAPER = 'rgb(0, 214, 0)';
const SURFACE_FOIL = 'rgb(0, 70, 255)';
const SURFACE_INK = 'rgb(0, 150, 0)';

function goldGradient(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, W, H);
  GOLD_STOPS.forEach((stop, index) => gradient.addColorStop(index / (GOLD_STOPS.length - 1), stop));
  return gradient;
}

function foil(ctx: CanvasRenderingContext2D, mode: Mode) {
  return mode === 'color' ? goldGradient(ctx) : SURFACE_FOIL;
}

/** Deterministic PRNG so the paper grain is identical between redraws. */
function random(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

/** Arch outline in canvas pixels: semicircle top, straight sides, square-ish base. */
function archPath(ctx: CanvasRenderingContext2D, inset: number, corner = 18) {
  const radius = W / 2 - inset;
  const cy = W / 2; // arch centre sits one half-width below the top
  ctx.beginPath();
  ctx.moveTo(inset, cy);
  ctx.arc(W / 2, cy, radius, Math.PI, 0);
  ctx.lineTo(W - inset, H - inset - corner);
  ctx.quadraticCurveTo(W - inset, H - inset, W - inset - corner, H - inset);
  ctx.lineTo(inset + corner, H - inset);
  ctx.quadraticCurveTo(inset, H - inset, inset, H - inset - corner);
  ctx.closePath();
}

function paper(ctx: CanvasRenderingContext2D, mode: Mode, tint = PAPER, seed = 7) {
  ctx.fillStyle = mode === 'color' ? tint : SURFACE_PAPER;
  ctx.fillRect(0, 0, W, H);
  if (mode !== 'color') return;
  // Soft cotton-paper fibre.
  const rand = random(seed);
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = rand() > 0.5 ? 'rgba(120, 90, 60, 0.05)' : 'rgba(255, 255, 255, 0.18)';
    ctx.fillRect(rand() * W, rand() * H, 1 + rand() * 2, 1 + rand() * 2);
  }
}

function spacedText(ctx: CanvasRenderingContext2D, text: string, y: number, spacing: number) {
  // canvas letterSpacing is widely supported; fall back to plain text otherwise.
  const context = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ('letterSpacing' in context) context.letterSpacing = `${spacing}px`;
  ctx.fillText(text, W / 2 + spacing / 2, y);
  if ('letterSpacing' in context) context.letterSpacing = '0px';
}

function sprig(ctx: CanvasRenderingContext2D, y: number, mode: Mode) {
  ctx.strokeStyle = foil(ctx, mode);
  ctx.fillStyle = foil(ctx, mode);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 150, y);
  ctx.lineTo(W / 2 - 26, y);
  ctx.moveTo(W / 2 + 26, y);
  ctx.lineTo(W / 2 + 150, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2, y - 16);
  ctx.lineTo(W / 2 + 14, y);
  ctx.lineTo(W / 2, y + 16);
  ctx.lineTo(W / 2 - 14, y);
  ctx.closePath();
  ctx.fill();
}

/** Front: the invitation wording. Layout leaves 25–34% height free for the vellum band. */
export function drawFront(ctx: CanvasRenderingContext2D, mode: Mode) {
  paper(ctx, mode);
  const gold = foil(ctx, mode);
  const ink = mode === 'color' ? INK : SURFACE_INK;

  ctx.strokeStyle = gold;
  ctx.lineWidth = 5;
  archPath(ctx, 44);
  ctx.stroke();
  ctx.lineWidth = 1.5;
  archPath(ctx, 62, 10);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  sprig(ctx, H * 0.14, mode);

  ctx.fillStyle = ink;
  ctx.font = `500 25px ${SANS}`;
  spacedText(ctx, 'TOGETHER WITH THEIR FAMILIES', H * 0.215, 7);

  ctx.fillStyle = gold;
  ctx.font = `italic 400 150px ${SERIF}`;
  ctx.fillText('Laila', W / 2, H * 0.34);
  ctx.font = `italic 400 96px ${SERIF}`;
  ctx.fillText('&', W / 2, H * 0.435);
  ctx.font = `italic 400 150px ${SERIF}`;
  ctx.fillText('Omar', W / 2, H * 0.525);

  ctx.fillStyle = ink;
  ctx.font = `400 26px ${SANS}`;
  spacedText(ctx, 'REQUEST THE PLEASURE OF YOUR COMPANY', H * 0.615, 5);

  // (vellum band + seal sit over roughly 0.66 – 0.75 of the height)

  ctx.font = `400 44px ${SERIF}`;
  ctx.fillText('Saturday, the twelfth of December', W / 2, H * 0.815);
  ctx.font = `500 24px ${SANS}`;
  spacedText(ctx, 'TWO THOUSAND TWENTY-SIX · CAIRO', H * 0.862, 6);

  ctx.fillStyle = gold;
  ctx.font = `italic 400 40px ${SERIF}`;
  ctx.fillText('ajwaa', W / 2, H * 0.925);
}

/** Back: a single monogram and a quiet collection mark. */
export function drawBack(ctx: CanvasRenderingContext2D, mode: Mode) {
  paper(ctx, mode, '#efe4d3', 13);
  const gold = foil(ctx, mode);

  ctx.strokeStyle = gold;
  ctx.lineWidth = 3;
  archPath(ctx, 54);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(W / 2, H * 0.47, 200, 0, Math.PI * 2);
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W / 2, H * 0.47, 178, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = gold;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `italic 400 250px ${SERIF}`;
  ctx.fillText('A', W / 2, H * 0.475);

  ctx.fillStyle = mode === 'color' ? '#6f5a47' : SURFACE_INK;
  ctx.font = `500 24px ${SANS}`;
  spacedText(ctx, 'THE AJWAA COLLECTION', H * 0.7, 9);
  sprig(ctx, H * 0.76, mode);
}

/** Top disc of the wax seal: an embossed gold initial on oxblood wax. */
export function drawSeal(ctx: CanvasRenderingContext2D) {
  const size = ctx.canvas.width;
  const c = size / 2;
  const wax = ctx.createRadialGradient(c * 0.8, c * 0.7, 10, c, c, c);
  wax.addColorStop(0, '#8d2230');
  wax.addColorStop(1, '#4f0d16');
  ctx.fillStyle = wax;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = 'rgba(231, 207, 159, 0.8)';
  ctx.lineWidth = size * 0.025;
  ctx.beginPath();
  ctx.arc(c, c, c * 0.8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `italic 400 ${size * 0.62}px ${SERIF}`;
  // Pressed shadow first, then the raised gold letter.
  ctx.fillStyle = 'rgba(30, 4, 8, 0.6)';
  ctx.fillText('A', c + size * 0.012, c + size * 0.03);
  ctx.fillStyle = '#e1c28d';
  ctx.fillText('A', c, c + size * 0.015);
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export type InvitationTextures = {
  front: THREE.CanvasTexture;
  frontSurface: THREE.CanvasTexture;
  back: THREE.CanvasTexture;
  backSurface: THREE.CanvasTexture;
  seal: THREE.CanvasTexture;
  /** Redraw everything (call once web fonts have loaded). */
  redraw: () => void;
  dispose: () => void;
};

export function createInvitationTextures(anisotropy: number): InvitationTextures {
  const layers = [
    { canvas: makeCanvas(W, H), draw: (ctx: CanvasRenderingContext2D) => drawFront(ctx, 'color'), color: true },
    { canvas: makeCanvas(W, H), draw: (ctx: CanvasRenderingContext2D) => drawFront(ctx, 'surface'), color: false },
    { canvas: makeCanvas(W, H), draw: (ctx: CanvasRenderingContext2D) => drawBack(ctx, 'color'), color: true },
    { canvas: makeCanvas(W, H), draw: (ctx: CanvasRenderingContext2D) => drawBack(ctx, 'surface'), color: false },
    { canvas: makeCanvas(256, 256), draw: drawSeal, color: true },
  ];

  const textures = layers.map(({ canvas, color }) => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.anisotropy = anisotropy;
    return texture;
  });

  const redraw = () => layers.forEach(({ canvas, draw }, index) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
    textures[index].needsUpdate = true;
  });
  redraw();

  const [front, frontSurface, back, backSurface, seal] = textures;
  return { front, frontSurface, back, backSurface, seal, redraw, dispose: () => textures.forEach(t => t.dispose()) };
}

/** Resolves once the fonts used on the card are available to canvas. */
export function loadCardFonts() {
  if (!('fonts' in document)) return Promise.resolve();
  return Promise.all([
    document.fonts.load(`italic 400 150px ${SERIF}`, 'Laila & Omar A'),
    document.fonts.load(`400 50px ${SERIF}`, 'Saturday'),
    document.fonts.load(`500 25px ${SANS}`, 'TOGETHER'),
  ]).then(() => undefined, () => undefined);
}
