/**
 * WebGL half of the experience (lazy-loaded). Renders one invitation phone in the
 * middle of a full-viewport canvas and poses it from scroll:
 *
 *   scroll ──ScrollTrigger(scrub)──▶ story progress ──keyframes──▶ pose
 *   slot rect (every frame) ──screen→world──▶ dock position & scale
 *
 * The phone itself is never translated by scroll, except when docking into
 * the featured package card near the end of the story.
 *
 * On top of that: visitors can drag the phone (it springs back to its pose),
 * tap the sealed envelope to open it, and rendering quality adapts to the
 * device's frame rate.
 */
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { PerformanceMonitor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE, KEYFRAMES, MOBILE_QUERY, REDUCED_MOTION_POSE, type InvitationPose } from './experienceConfig';
import ProceduralPhone from './ProceduralPhone';
import { trackEvent } from '../../lib/telemetry';

gsap.registerPlugin(ScrollTrigger);

type SceneProps = {
  root: HTMLElement;
  /** False while the story is off-screen: rendering pauses completely. */
  active: boolean;
  reducedMotion: boolean;
  onReady: () => void;
};

const DEG = Math.PI / 180;
const lerp = THREE.MathUtils.lerp;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
type RenderQuality = keyof typeof EXPERIENCE.quality;
const TIERS: RenderQuality[] = ['low', 'medium', 'high'];

/** Start lower on devices that hint they are modest, then let the frame rate decide. */
function initialQuality(): RenderQuality {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return 'low';
  if ((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4) return 'medium';
  return 'high';
}

/** Wrap an angle into −π…π so a released spin springs home the short way. */
function unwind(angle: number) {
  return angle - Math.PI * 2 * Math.round(angle / (Math.PI * 2));
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const update = () => setMatches(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/** Studio lighting without any network request: three's RoomEnvironment, prefiltered once. */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      target.dispose(); pmrem.dispose(); room.dispose();
    };
  }, [gl, scene]);
  return null;
}

/** Optional GLB, centred and scaled to the procedural phone's height. */
function GltfInvitation({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const scale = EXPERIENCE.modelSize.height / (size.y || 1);
    clone.position.copy(centre).multiplyScalar(-scale);
    clone.scale.setScalar(scale);
    const wrapper = new THREE.Group();
    wrapper.add(clone);
    return wrapper;
  }, [scene]);
  useEffect(onReady, [onReady]);
  return <primitive object={model} />;
}

/** Blend between keyframes; `anchors[i]` is the story progress where keyframe i is fully reached. */
function samplePose(anchors: number[], progress: number, ease: (t: number) => number, out: InvitationPose) {
  let index = 0;
  while (index < anchors.length - 2 && progress > anchors[index + 1]) index++;
  const from = KEYFRAMES[index];
  const to = KEYFRAMES[index + 1] ?? from;
  const span = anchors[index + 1] - anchors[index];
  const t = ease(span > 0 ? clamp01((progress - anchors[index]) / span) : 1);
  out.spin = lerp(from.spin, to.spin, t);
  out.yaw = lerp(from.yaw, to.yaw, t);
  out.tiltX = lerp(from.tiltX, to.tiltX, t);
  out.tiltZ = lerp(from.tiltZ, to.tiltZ, t);
  out.scale = lerp(from.scale, to.scale, t);
  out.distance = lerp(from.distance, to.distance, t);
  out.light = lerp(from.light, to.light, t);
  out.screen = lerp(from.screen, to.screen, t);
  return out;
}

function InvitationRig({ root, reducedMotion, onReady }: Omit<SceneProps, 'active'>) {
  const group = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const finePointer = useMediaQuery('(pointer: fine)');

  // Mutable animation state lives outside React so scrolling never re-renders.
  const motion = useMemo(() => ({
    story: 0,
    dock: 0,
    anchors: KEYFRAMES.map((_, index) => index / (KEYFRAMES.length - 1)),
    pointer: new THREE.Vector2(),
    tilt: new THREE.Vector2(),
    pose: { ...KEYFRAMES[0] },
    /** Invitation page on the phone screen, read by ProceduralPhone every frame. */
    screen: { value: KEYFRAMES[0].screen },
    /** 0 → 1 once the visitor taps the sealed envelope open. */
    open: 0,
    /** Drag offsets layered on the pose, with spring velocities. */
    drag: { active: false, pointerId: -1, yaw: 0, pitch: 0, yawVelocity: 0, pitchVelocity: 0, startX: 0, startY: 0, lastX: 0, lastY: 0, startTime: 0, lastTime: 0, moved: 0 },
    hovering: false,
    tracked: { drag: false, open: false },
  }), []);
  const canvas = useThree(state => state.gl.domElement);

  const slot = useMemo(() => root.querySelector<HTMLElement>('[data-xp-slot]'), [root]);
  const personaliseGap = useMemo(() => root.querySelector<HTMLElement>('[data-xp-section="personalise"] [data-xp-focus]'), [root]);

  // Scroll wiring: one scrubbed tween for the story, one for the dock.
  useEffect(() => {
    if (reducedMotion) return;
    const sections = KEYFRAMES.map(frame => root.querySelector<HTMLElement>(`[data-xp-section="${frame.id}"]`));

    // Keyframe i is reached when its section's centre meets the viewport centre —
    // or, on stacked layouts, the centre of the empty gap left for the phone.
    const measure = (trigger: ScrollTrigger) => {
      const range = trigger.end - trigger.start || 1;
      let previous = 0;
      motion.anchors = sections.map((section, index) => {
        if (!section) return index / (sections.length - 1);
        const focus = section.querySelector<HTMLElement>('[data-xp-focus]');
        const focusRect = focus?.getBoundingClientRect();
        const rect = focusRect && focusRect.height > 0 ? focusRect : section.getBoundingClientRect();
        const centreScroll = rect.top + scrollY + rect.height / 2 - innerHeight / 2;
        previous = Math.max(previous, clamp01((centreScroll - trigger.start) / range));
        return previous;
      });
    };

    const context = gsap.context(() => {
      const story = gsap.to(motion, {
        story: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root, start: 'top top', end: 'bottom bottom', scrub: EXPERIENCE.scrub,
          invalidateOnRefresh: true, onRefresh: measure,
        },
      });
      if (story.scrollTrigger) measure(story.scrollTrigger);
      if (slot) {
        gsap.to(motion, {
          dock: 1,
          ease: 'none',
          scrollTrigger: { trigger: slot, start: EXPERIENCE.dock.start, end: EXPERIENCE.dock.end, scrub: EXPERIENCE.scrub },
        });
      }
    });

    // Web fonts and lazy images change section heights; re-measure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    addEventListener('load', refresh);
    return () => { removeEventListener('load', refresh); context.revert(); };
  }, [root, slot, reducedMotion, motion]);

  // Pointer tilt, normalised to −1…1 around the viewport centre.
  useEffect(() => {
    if (reducedMotion || !finePointer) { motion.pointer.set(0, 0); return; }
    const move = (event: PointerEvent) => motion.pointer.set(
      (event.clientX / innerWidth) * 2 - 1,
      (event.clientY / innerHeight) * 2 - 1,
    );
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, [reducedMotion, finePointer, motion]);

  // Tap: open the envelope if it is showing, and give the phone a playful spin.
  const tap = () => {
    if (motion.screen.value < 0.5 && motion.open < 1) {
      if (reducedMotion) motion.open = 1;
      else gsap.to(motion, { open: 1, duration: 0.9, ease: 'power2.inOut' });
      if (!motion.tracked.open) { motion.tracked.open = true; trackEvent('experience_interaction', { action: 'envelope_opened' }); }
    }
    if (!reducedMotion) motion.drag.yawVelocity += EXPERIENCE.drag.spinKick;
  };

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const drag = motion.drag;
    const now = performance.now();
    Object.assign(drag, {
      active: true, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY,
      lastX: event.clientX, lastY: event.clientY, startTime: now, lastTime: now, moved: 0, yawVelocity: 0, pitchVelocity: 0,
    });
    canvas.style.cursor = 'grabbing';
    const { radiansPerPixel, maxPitch, tapMs, tapSlop } = EXPERIENCE.drag;

    const move = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== drag.pointerId) return;
      const time = performance.now();
      const seconds = Math.max(1, time - drag.lastTime) / 1000;
      const yaw = (moveEvent.clientX - drag.lastX) * radiansPerPixel;
      const pitch = (moveEvent.clientY - drag.lastY) * radiansPerPixel * 0.6;
      drag.moved = Math.max(drag.moved, Math.hypot(moveEvent.clientX - drag.startX, moveEvent.clientY - drag.startY));
      drag.lastX = moveEvent.clientX;
      drag.lastY = moveEvent.clientY;
      drag.lastTime = time;
      if (reducedMotion) return;
      drag.yaw += yaw;
      drag.pitch = THREE.MathUtils.clamp(drag.pitch + pitch, -maxPitch, maxPitch);
      drag.yawVelocity = yaw / seconds;
      drag.pitchVelocity = pitch / seconds;
      if (drag.moved > 20 && !motion.tracked.drag) { motion.tracked.drag = true; trackEvent('experience_interaction', { action: 'phone_dragged' }); }
    };
    const release = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== drag.pointerId) return;
      removeEventListener('pointermove', move);
      removeEventListener('pointerup', release);
      removeEventListener('pointercancel', release);
      drag.active = false;
      drag.yaw = unwind(drag.yaw);
      // A pointer held still before release should not fling.
      if (performance.now() - drag.lastTime > 80) { drag.yawVelocity = 0; drag.pitchVelocity = 0; }
      canvas.style.cursor = motion.hovering ? 'grab' : '';
      if (upEvent.type === 'pointerup' && drag.moved < tapSlop && performance.now() - drag.startTime < tapMs) tap();
    };
    addEventListener('pointermove', move);
    addEventListener('pointerup', release);
    addEventListener('pointercancel', release);
  };
  const onPointerOver = () => { motion.hovering = true; if (!motion.drag.active) canvas.style.cursor = 'grab'; };
  const onPointerOut = () => { motion.hovering = false; if (!motion.drag.active) canvas.style.cursor = ''; };

  const storyEase = useMemo(() => gsap.parseEase(EXPERIENCE.ease), []);
  const dockEase = useMemo(() => gsap.parseEase(EXPERIENCE.dock.ease), []);
  const dockPose = KEYFRAMES[KEYFRAMES.length - 1];

  useFrame(({ camera, size, clock, gl }, delta) => {
    const phone = group.current;
    if (!phone) return;
    const perspective = camera as THREE.PerspectiveCamera;
    const rotationScale = isMobile ? EXPERIENCE.mobileRotationScale : 1;
    const baseScale = isMobile ? EXPERIENCE.baseScale.mobile : EXPERIENCE.baseScale.desktop;

    const pose = reducedMotion ? REDUCED_MOTION_POSE : samplePose(motion.anchors, motion.story, storyEase, motion.pose);

    // Measure the slot every frame so the dock tracks scrolling and resizing exactly.
    const slotRect = slot?.getBoundingClientRect();
    if (reducedMotion) {
      // No scrubbing: the phone is either centred or already resting in its slot.
      motion.dock = slotRect && slotRect.top < innerHeight * 0.7 ? 1 : 0;
    }
    const dock = reducedMotion ? motion.dock : dockEase(clamp01(motion.dock));

    // Camera and key light follow the pose.
    const distance = lerp(pose.distance, dockPose.distance, dock);
    perspective.position.set(0, 0, distance);
    const lightAngle = lerp(pose.light, dockPose.light, dock) * DEG;
    keyLight.current?.position.set(Math.sin(lightAngle) * 6, 3.2, Math.cos(lightAngle) * 6);

    // Idle float + lerped pointer tilt, both fading out as the phone docks.
    const time = clock.elapsedTime;
    const idle = reducedMotion ? 0 : 1 - dock;
    const floatY = Math.sin(time * EXPERIENCE.idle.floatSpeed) * EXPERIENCE.idle.floatAmplitude * idle;
    const sway = Math.sin(time * EXPERIENCE.idle.floatSpeed * 0.7) * EXPERIENCE.idle.swayAmplitude * idle;
    const maxTilt = EXPERIENCE.pointer.maxTiltDeg * DEG;
    const damping = 1 - Math.pow(1 - EXPERIENCE.pointer.damping, delta * 60);
    motion.tilt.x += (motion.pointer.y * maxTilt - motion.tilt.x) * damping;
    motion.tilt.y += (motion.pointer.x * maxTilt - motion.tilt.y) * damping;

    const rotY = pose.spin * Math.PI + pose.yaw * rotationScale;
    const dockRotY = dockPose.spin * Math.PI + dockPose.yaw;
    let x = 0;
    let y = floatY;
    let scale = pose.scale * baseScale;
    const canvasRect = gl.domElement.getBoundingClientRect();
    const worldPerPixel = (2 * distance * Math.tan((perspective.fov * DEG) / 2)) / size.height;

    // Stacked layouts: once the "Make it yours" gap passes the middle of the screen, the
    // phone rides up with it so it stays just above the form instead of behind it.
    if (isMobile && personaliseGap) {
      const gapRect = personaliseGap.getBoundingClientRect();
      const offset = gapRect.top + gapRect.height / 2 - (canvasRect.top + size.height / 2);
      if (offset < 0) y -= offset * worldPerPixel;
    }

    if (slotRect && dock > 0) {
      // Screen → world on the z = 0 plane the phone lives in.
      const visibleHeight = 2 * distance * Math.tan((perspective.fov * DEG) / 2);
      const visibleWidth = visibleHeight * (size.width / size.height);
      const slotX = ((slotRect.left + slotRect.width / 2 - canvasRect.left) / size.width - 0.5) * visibleWidth;
      const slotY = -((slotRect.top + slotRect.height / 2 - canvasRect.top) / size.height - 0.5) * visibleHeight;
      const slotScale = Math.min(
        (slotRect.width / size.width) * visibleWidth / EXPERIENCE.modelSize.width,
        (slotRect.height / size.height) * visibleHeight / EXPERIENCE.modelSize.height,
      );
      x = lerp(0, slotX, dock);
      y = lerp(y, slotY, dock);
      scale = lerp(scale, slotScale, dock);
    }

    // Released drags spring back to the pose (critically damped, so no wobble loop).
    const drag = motion.drag;
    if (!drag.active) {
      const step = Math.min(delta, 1 / 30);
      const stiffness = EXPERIENCE.drag.stiffness;
      const damper = 2 * Math.sqrt(stiffness);
      drag.yawVelocity += (-stiffness * drag.yaw - damper * drag.yawVelocity) * step;
      drag.pitchVelocity += (-stiffness * drag.pitch - damper * drag.pitchVelocity) * step;
      drag.yaw += drag.yawVelocity * step;
      drag.pitch += drag.pitchVelocity * step;
    }

    // Scroll picks the page; a tapped-open envelope skips ahead to the names page.
    const page = lerp(pose.screen, dockPose.screen, dock);
    motion.screen.value = page + (Math.max(1, page) - page) * motion.open;
    phone.position.set(x, y, 0);
    phone.scale.setScalar(scale);
    phone.rotation.set(
      lerp(pose.tiltX * rotationScale + motion.tilt.x, 0, dock) + drag.pitch,
      lerp(rotY + motion.tilt.y, dockRotY, dock) + drag.yaw,
      lerp(pose.tiltZ * rotationScale + sway, 0, dock),
    );
  });

  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.18} color="#ffe9d6" />
      <directionalLight ref={keyLight} intensity={2.3} color="#ffe4c2" position={[3, 3.2, 5]} />
      {/* Warm rim light from behind, catching the gilded edges. */}
      <directionalLight intensity={3.2} color="#ffa566" position={[-4.5, 2.5, -5]} />
      <pointLight intensity={6} color="#b3323f" distance={12} position={[0, -4, 2]} />
      <group ref={group} onPointerDown={onPointerDown} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        {EXPERIENCE.modelUrl
          ? <GltfInvitation url={`${import.meta.env.BASE_URL}${EXPERIENCE.modelUrl}`} onReady={onReady} />
          : <ProceduralPhone screen={motion.screen} onReady={onReady} />}
      </group>
    </>
  );
}

export default function InvitationScene({ root, active, reducedMotion, onReady }: SceneProps) {
  const [quality, setQuality] = useState(initialQuality);
  const step = (direction: 1 | -1) => setQuality(current => TIERS[THREE.MathUtils.clamp(TIERS.indexOf(current) + direction, 0, TIERS.length - 1)]);
  // Exposed for debugging and tests: <section data-quality="high|medium|low">.
  useEffect(() => { root.dataset.quality = quality; }, [root, quality]);
  const dpr = Math.min(EXPERIENCE.quality[quality].dpr, EXPERIENCE.maxDpr, window.devicePixelRatio || 1);

  return (
    <Canvas
      className="xp__canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      camera={{ fov: EXPERIENCE.camera.fov, position: [0, 0, KEYFRAMES[0].distance], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      {/* Steps quality down when the frame rate sags, back up when it recovers; settles on low if it keeps flip-flopping. */}
      <PerformanceMonitor onDecline={() => step(-1)} onIncline={() => step(1)} flipflops={4} onFallback={() => setQuality('low')} />
      <Suspense fallback={null}>
        <InvitationRig root={root} reducedMotion={reducedMotion} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
