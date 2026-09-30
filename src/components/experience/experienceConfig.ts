/**
 * Ajwaa "Unfolding Invitation" experience — pose configuration.
 *
 * The 3D invitation never moves with the page. Instead, every story chapter
 * owns one keyframe below, and scroll position blends between neighbouring
 * keyframes. Tweak these numbers to re-choreograph the piece; nothing else
 * needs to change.
 *
 * Units
 *  - spin      half-turns around Y (0 = front facing camera, 1 = back, 2 = front again).
 *              Spins are interpolated literally, so 0 → 2 is one full turn.
 *  - yaw       extra Y rotation in radians, applied on top of `spin`.
 *  - tiltX/Z   pitch / roll in radians.
 *  - scale     multiplier on the device's base size (see `baseScale`).
 *  - distance  camera distance from the card in world units (smaller = closer).
 *  - light     key-light orbit angle in degrees (0 = front, +90 = from the right).
 */
export type InvitationPose = {
  /** Matches a `data-xp-section` attribute in the DOM. */
  id: string;
  spin: number;
  yaw: number;
  tiltX: number;
  tiltZ: number;
  scale: number;
  distance: number;
  light: number;
};

export const KEYFRAMES: InvitationPose[] = [
  // 1. Opening — the card turned slightly toward the viewer, wordmark behind it.
  { id: 'hero', spin: 0, yaw: -0.32, tiltX: 0.06, tiltZ: 0.035, scale: 1, distance: 8, light: 38 },
  // 2. Atelier — text on the left, so the card opens its face to the right.
  { id: 'atelier', spin: 0, yaw: 0.55, tiltX: -0.1, tiltZ: -0.07, scale: 1.06, distance: 7.4, light: -24 },
  // 3. Details — a half turn reveals the monogrammed back.
  { id: 'details', spin: -1, yaw: -0.4, tiltX: 0.12, tiltZ: 0.05, scale: 0.98, distance: 7.8, light: 64 },
  // 4. Process — completes the turn and leans in close.
  { id: 'process', spin: -2, yaw: 0.28, tiltX: -0.05, tiltZ: -0.04, scale: 1.04, distance: 7.1, light: -40 },
  // 5. Packages — perfectly upright, ready to settle into the featured card.
  { id: 'packages', spin: -2, yaw: 0, tiltX: 0, tiltZ: 0, scale: 0.92, distance: 8, light: 12 },
];

/** Pose used when the visitor prefers reduced motion (no scrubbing at all). */
export const REDUCED_MOTION_POSE = KEYFRAMES[0];

export const EXPERIENCE = {
  /**
   * Optional GLB model. Place a file in /public (e.g. /public/invitation.glb)
   * and set this to 'invitation.glb'. It is auto-centred and scaled to the
   * procedural card's 2 × 3 footprint so the docking maths keeps working.
   * Leave null to use the procedural card.
   */
  modelUrl: null as string | null,

  /** Procedural card size in world units (width × height). */
  cardSize: { width: 2, height: 3 },

  camera: { fov: 30 },

  /** Base size of the card per layout. */
  baseScale: { desktop: 0.78, mobile: 0.42 },

  /** Mobile keeps the choreography but calms every rotation by this factor. */
  mobileRotationScale: 0.55,

  /** Layered on top of the scroll pose. */
  idle: { floatAmplitude: 0.05, floatSpeed: 0.8, swayAmplitude: 0.012 },
  pointer: { maxTiltDeg: 4, damping: 0.06 },

  /** GSAP scrub smoothing in seconds (ScrollTrigger `scrub`). */
  scrub: 1,

  /** Easing between keyframes (any GSAP ease string). */
  ease: 'power2.inOut',

  /**
   * Docking into the featured package card. Progress runs from when the slot's
   * top enters the bottom of the viewport until its centre reaches the `end` line.
   */
  dock: { start: 'top bottom', end: 'center 58%', ease: 'power3.inOut' },

  /** Hard cap on renderer pixel ratio. */
  maxDpr: 2,
} as const;

/** Below this width text stacks above/below the card and motion is calmed. */
export const MOBILE_QUERY = '(max-width: 1023px)';
