/**
 * Procedural smartphone: champagne-gold frame, glass front over a live
 * invitation screen, frosted back glass with an engraved monogram and a
 * camera plateau. Centred on the origin and `EXPERIENCE.modelSize` wide ×
 * tall, so the docking maths can treat it as a simple rectangle.
 *
 * The screen cross-fades between invitation pages using `screen.value`
 * (0 = sealed envelope, 1 = names & countdown, 2 = details & map), which the
 * rig updates from the scroll keyframes. Pages redraw live from the visitor's
 * names, date and design (personalisation.ts).
 */
import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EXPERIENCE } from './experienceConfig';
import { createPhoneTextures, loadScreenFonts, loadScreenPhoto } from './phoneTextures';
import { getPersonalisation, screenContent, subscribePersonalisation } from './personalisation';

const DEPTH = 0.16;
const BEVEL = 0.03;
const CORNER = 0.19;
const BEZEL = 0.05;
const FRONT_Z = DEPTH / 2;

function roundedRect(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

/** ShapeGeometry UVs are in shape units; remap them to 0–1 across the face. */
function face(width: number, height: number, radius: number) {
  const geometry = new THREE.ShapeGeometry(roundedRect(width, height, radius), 24);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) uv.setXY(i, position.getX(i) / width + 0.5, position.getY(i) / height + 0.5);
  uv.needsUpdate = true;
  return geometry;
}

/** Unlit screen that blends two invitation pages. */
function screenMaterial(first: THREE.Texture) {
  return new THREE.ShaderMaterial({
    uniforms: { mapA: { value: first }, mapB: { value: first }, amount: { value: 0 }, brightness: { value: 1.02 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D mapA;
      uniform sampler2D mapB;
      uniform float amount;
      uniform float brightness;
      varying vec2 vUv;
      void main() {
        vec3 colour = mix(texture2D(mapA, vUv).rgb, texture2D(mapB, vUv).rgb, amount);
        gl_FragColor = vec4(colour * brightness, 1.0);
        #include <colorspace_fragment>
      }
    `,
    toneMapped: false,
  });
}

type PhoneProps = { screen: { value: number }; onReady: () => void };

export default function ProceduralPhone({ screen, onReady }: PhoneProps) {
  const gl = useThree(state => state.gl);
  const { width, height } = EXPERIENCE.modelSize;

  const parts = useMemo(() => {
    const inner = { w: width - BEVEL * 2, h: height - BEVEL * 2, r: CORNER };
    const body = new THREE.ExtrudeGeometry(roundedRect(inner.w, inner.h, inner.r), {
      depth: DEPTH - BEVEL * 2, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 5, curveSegments: 24,
    });
    body.translate(0, 0, -(DEPTH - BEVEL * 2) / 2);

    const textures = createPhoneTextures(Math.min(8, gl.capabilities.getMaxAnisotropy()), screenContent(getPersonalisation()));
    const frame = new THREE.MeshPhysicalMaterial({ color: '#d2b48a', metalness: 1, roughness: 0.22, clearcoat: 0.4 });

    const bump = { w: 0.6, h: 0.62, r: 0.15, depth: 0.03 };
    const lens = new THREE.CylinderGeometry(0.105, 0.105, 0.03, 48);
    lens.rotateX(Math.PI / 2);
    const lensGlass = new THREE.CircleGeometry(0.075, 48);
    const button = new THREE.BoxGeometry(0.018, 1, 0.055);

    return {
      body,
      front: face(inner.w, inner.h, inner.r),
      screen: face(inner.w - BEZEL * 2, inner.h - BEZEL * 2, inner.r - BEZEL * 0.8),
      bump: new THREE.ExtrudeGeometry(roundedRect(bump.w, bump.h, bump.r), {
        depth: bump.depth, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 3, curveSegments: 16,
      }),
      bumpSize: bump,
      lens, lensGlass, button, textures,
      materials: {
        frame,
        bezel: new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.4 }),
        screen: screenMaterial(textures.screens[0]),
        // Cover glass: a thin glossy film. (Transmission would re-sample the screen from a
        // blurred buffer and soften the invitation text, so it is deliberately not used here.)
        glass: new THREE.MeshPhysicalMaterial({
          color: '#ffffff', transparent: true, opacity: 0.14, depthWrite: false,
          roughness: 0.02, clearcoat: 1, clearcoatRoughness: 0.02, specularIntensity: 1,
        }),
        back: new THREE.MeshPhysicalMaterial({ map: textures.back, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.12 }),
        plateau: new THREE.MeshPhysicalMaterial({ color: '#e3cfb2', roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05 }),
        lensGlass: new THREE.MeshPhysicalMaterial({ color: '#07080c', roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0, iridescence: 0.6 }),
        flash: new THREE.MeshStandardMaterial({ color: '#f4ecd8', roughness: 0.3, emissive: '#3a3226' }),
      },
    };
  }, [gl, width, height]);

  // Keep the pages in sync with the visitor's names, date and design.
  useEffect(() => {
    let cancelled = false;
    let revealed = false;
    let pending = 0;
    let photo: HTMLImageElement | null = null;
    let photoUrl = '';

    const draw = async () => {
      const content = screenContent(getPersonalisation());
      const url = `${import.meta.env.BASE_URL}${content.design.photo}`;
      // Wait for fonts and a new design's photo so pages never flash half-drawn.
      const [, nextPhoto] = await Promise.all([loadScreenFonts(), url === photoUrl ? photo : loadScreenPhoto(url)]);
      if (cancelled) return;
      photo = nextPhoto;
      photoUrl = url;
      parts.textures.redraw(content, photo);
      if (!revealed) { revealed = true; onReady(); }
    };
    // Typing fires many updates; redraw once the visitor pauses briefly.
    const schedule = () => { clearTimeout(pending); pending = window.setTimeout(draw, 90); };
    const unsubscribe = subscribePersonalisation(schedule);
    // The countdown is live: refresh just the names page twice a minute.
    const tick = window.setInterval(() => {
      if (photoUrl) parts.textures.redraw(screenContent(getPersonalisation()), photo, [1]);
    }, 30_000);
    draw();
    return () => { cancelled = true; unsubscribe(); clearTimeout(pending); clearInterval(tick); };
  }, [parts, onReady]);


  useEffect(() => () => {
    [parts.body, parts.front, parts.screen, parts.bump, parts.lens, parts.lensGlass, parts.button].forEach(geometry => geometry.dispose());
    parts.textures.dispose();
    Object.values(parts.materials).forEach(material => material.dispose());
  }, [parts]);

  // Pick the two pages either side of the current value and blend between them.
  useFrame(() => {
    const { screens } = parts.textures;
    const value = THREE.MathUtils.clamp(screen.value, 0, screens.length - 1);
    const index = Math.min(Math.floor(value), screens.length - 2);
    const uniforms = parts.materials.screen.uniforms;
    uniforms.mapA.value = screens[index];
    uniforms.mapB.value = screens[index + 1];
    uniforms.amount.value = value - index;
  });

  const { materials, bumpSize } = parts;
  const halfW = width / 2;
  // The camera plateau sits top-left when looking at the back (world +x from behind).
  const bumpX = halfW - 0.1 - bumpSize.w / 2;
  const bumpY = height / 2 - 0.1 - bumpSize.h / 2;
  const backZ = -FRONT_Z - 0.0005;

  return (
    <group>
      <mesh geometry={parts.body} material={materials.frame} />
      <mesh geometry={parts.front} material={materials.bezel} position-z={FRONT_Z + 0.0005} />
      <mesh geometry={parts.screen} material={materials.screen} position-z={FRONT_Z + 0.001} />
      <mesh geometry={parts.front} material={materials.glass} position-z={FRONT_Z + 0.003} />
      <mesh geometry={parts.front} material={materials.back} position-z={backZ} rotation-y={Math.PI} />

      {/* Side buttons: power on the right, volume on the left. */}
      <mesh geometry={parts.button} material={materials.frame} position={[halfW + 0.006, 0.55, 0]} scale-y={0.36} />
      <mesh geometry={parts.button} material={materials.frame} position={[-halfW - 0.006, 0.72, 0]} scale-y={0.24} />
      <mesh geometry={parts.button} material={materials.frame} position={[-halfW - 0.006, 0.4, 0]} scale-y={0.24} />

      {/* Camera plateau with two lenses and a flash. */}
      <group position={[bumpX, bumpY, backZ]} rotation-y={Math.PI}>
        <mesh geometry={parts.bump} material={materials.plateau} />
        {[[-0.13, 0.14], [0.13, -0.14]].map(([x, y]) => (
          <group key={`${x}`} position={[x, y, bumpSize.depth + 0.008 + 0.015]}>
            <mesh geometry={parts.lens} material={materials.frame} />
            <mesh geometry={parts.lensGlass} material={materials.lensGlass} position-z={0.0155} />
          </group>
        ))}
        <mesh geometry={parts.lensGlass} material={materials.flash} position={[0.15, 0.16, bumpSize.depth + 0.009]} scale={0.4} />
      </group>
    </group>
  );
}
