/**
 * WebGL half of the experience (lazy-loaded). Renders one invitation phone in the
 * middle of a full-viewport canvas and poses it from scroll:
 *
 *   scroll ──ScrollTrigger(scrub)──▶ story progress ──keyframes──▶ pose
 *   slot rect (every frame) ──screen→world──▶ dock position & scale
 *
 * The phone itself is never translated by scroll, except when docking into
 * the featured package card near the end of the story.
 */
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE, KEYFRAMES, MOBILE_QUERY, REDUCED_MOTION_POSE, type InvitationPose } from './experienceConfig';
import ProceduralPhone from './ProceduralPhone';

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
  }), []);

  const slot = useMemo(() => root.querySelector<HTMLElement>('[data-xp-slot]'), [root]);

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

    if (slotRect && dock > 0) {
      // Screen → world on the z = 0 plane the phone lives in.
      const canvasRect = gl.domElement.getBoundingClientRect();
      const visibleHeight = 2 * distance * Math.tan((perspective.fov * DEG) / 2);
      const visibleWidth = visibleHeight * (size.width / size.height);
      const slotX = ((slotRect.left + slotRect.width / 2 - canvasRect.left) / size.width - 0.5) * visibleWidth;
      const slotY = -((slotRect.top + slotRect.height / 2 - canvasRect.top) / size.height - 0.5) * visibleHeight;
      const slotScale = Math.min(
        (slotRect.width / size.width) * visibleWidth / EXPERIENCE.modelSize.width,
        (slotRect.height / size.height) * visibleHeight / EXPERIENCE.modelSize.height,
      );
      x = lerp(0, slotX, dock);
      y = lerp(floatY, slotY, dock);
      scale = lerp(scale, slotScale, dock);
    }

    motion.screen.value = lerp(pose.screen, dockPose.screen, dock);
    phone.position.set(x, y, 0);
    phone.scale.setScalar(scale);
    phone.rotation.set(
      lerp(pose.tiltX * rotationScale + motion.tilt.x, 0, dock),
      lerp(rotY + motion.tilt.y, dockRotY, dock),
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
      <group ref={group}>
        {EXPERIENCE.modelUrl
          ? <GltfInvitation url={`${import.meta.env.BASE_URL}${EXPERIENCE.modelUrl}`} onReady={onReady} />
          : <ProceduralPhone screen={motion.screen} onReady={onReady} />}
      </group>
    </>
  );
}

export default function InvitationScene({ root, active, reducedMotion, onReady }: SceneProps) {
  return (
    <Canvas
      className="xp__canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, Math.min(EXPERIENCE.maxDpr, window.devicePixelRatio || 1)]}
      camera={{ fov: EXPERIENCE.camera.fov, position: [0, 0, KEYFRAMES[0].distance], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <InvitationRig root={root} reducedMotion={reducedMotion} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
