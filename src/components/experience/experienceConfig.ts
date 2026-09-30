/**
 * Ajwaa "Unfolding Invitation" experience — pose configuration.
 *
 * The 3D phone never moves with the page. Instead, every story chapter owns
 * one keyframe below, and scroll position blends between neighbouring
 * keyframes. Tweak these numbers to re-choreograph the piece; nothing else
 * needs to change.
 *
 * Units
 *  - spin      half-turns around Y (0 = screen facing camera, 1 = back, 2 = screen again).
 *              Spins are interpolated literally, so 0 → 2 is one full turn.
 *  - yaw       extra Y rotation in radians, applied on top of `spin`.
 *  - tiltX/Z   pitch / roll in radians.
 *  - scale     multiplier on the device's base size (see `baseScale`).
 *  - distance  camera distance from the phone in world units (smaller = closer).
 *  - light     key-light orbit angle in degrees (0 = front, +90 = from the right).
 *  - screen    invitation page on the phone: 0 sealed envelope, 1 names & countdown,
 *              2 details & map. Fractions cross-fade between pages.
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
  screen: number;
};

export const KEYFRAMES: InvitationPose[] = [
  // 1. Opening — the sealed envelope, phone turned slightly toward the viewer, wordmark behind it.
  { id: 'hero', spin: 0, yaw: -0.32, tiltX: 0.06, tiltZ: 0.035, scale: 1, distance: 8, light: 38, screen: 0 },
  // 2. Atelier — text on the left, so the phone opens its face to the right; the invitation opens.
  { id: 'atelier', spin: 0, yaw: 0.55, tiltX: -0.1, tiltZ: -0.07, scale: 1.06, distance: 7.4, light: -24, screen: 1 },
  // 3. Details — a half turn shows the engraved back while the screen changes page.
  { id: 'details', spin: -1, yaw: -0.4, tiltX: 0.12, tiltZ: 0.05, scale: 0.98, distance: 7.8, light: 64, screen: 2 },
  // 4. Process — completes the turn onto the details page and leans in close.
  { id: 'process', spin: -2, yaw: 0.28, tiltX: -0.05, tiltZ: -0.04, scale: 1.04, distance: 7.1, light: -40, screen: 2 },
  // 5. Make it yours — text on the right; the names page turns toward it while the visitor types.
  { id: 'personalise', spin: -2, yaw: -0.42, tiltX: 0.04, tiltZ: 0.03, scale: 1.1, distance: 7.2, light: 30, screen: 1 },
  // 6. Packages — perfectly upright on the names page, ready to settle into the featured card.
  { id: 'packages', spin: -2, yaw: 0, tiltX: 0, tiltZ: 0, scale: 0.92, distance: 8, light: 12, screen: 1 },
];

/**
 * Pose used when the visitor prefers reduced motion: no scrubbing at all. It starts on the
 * sealed envelope, which a tap opens instantly (no animation).
 */
export const REDUCED_MOTION_POSE: InvitationPose = KEYFRAMES[0];

export const EXPERIENCE = {
  /**
   * Optional GLB model. Place a file in /public (e.g. /public/phone.glb) and
   * set this to 'phone.glb'. It is auto-centred and scaled to `modelSize`'s
   * height so the docking maths keeps working. Leave null for the procedural phone.
   */
  modelUrl: null as string | null,

  /** Procedural phone size in world units (width × height). The dock slot uses the same ratio. */
  modelSize: { width: 1.46, height: 3 },

  camera: { fov: 30 },

  /** Base size of the phone per layout. */
  baseScale: { desktop: 0.76, mobile: 0.42 },

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

  /**
   * Touch & drag. `radiansPerPixel` turns the phone as the pointer moves; on release a
   * critically damped spring (`stiffness`) returns it to the scroll pose. A press that
   * moves less than `tapSlop` px within `tapMs` counts as a tap (opens the envelope).
   */
  drag: { radiansPerPixel: 0.011, maxPitch: 0.45, stiffness: 28, tapSlop: 6, tapMs: 350, spinKick: 7 },

  /**
   * Adaptive quality. Rendering starts at `high` (or `medium` on low-end hints) and steps
   * down (lower pixel ratio) whenever the frame rate drops, and back up when it recovers.
   */
  quality: { high: { dpr: 2 }, medium: { dpr: 1.5 }, low: { dpr: 1 } },
} as const;

/** Below this width text stacks above/below the phone and motion is calmed. */
export const MOBILE_QUERY = '(max-width: 1023px)';
