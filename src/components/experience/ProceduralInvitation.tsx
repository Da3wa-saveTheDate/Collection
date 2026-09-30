/**
 * Procedural invitation card: an arched card with gilded edges, a translucent
 * vellum belly band (the "glass" of the piece) and a lathe-turned wax seal.
 * Centred on the origin, `EXPERIENCE.cardSize` wide × tall, so the docking
 * maths can treat it as a simple rectangle.
 */
import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EXPERIENCE } from './experienceConfig';
import { createInvitationTextures, loadCardFonts } from './invitationTextures';

const THICKNESS = 0.03;
const BEVEL = 0.006;
const FACE_Z = THICKNESS / 2 + BEVEL + 0.0012;
// Band position mirrors the gap left in the front artwork (66–75% from the top).
const BAND_Y_FRACTION = 0.705;
const BAND_HEIGHT_FRACTION = 0.09;

function archShape(width: number, height: number) {
  const hw = width / 2;
  const hh = height / 2;
  const corner = width * 0.04;
  const shape = new THREE.Shape();
  shape.moveTo(-hw + corner, -hh);
  shape.lineTo(hw - corner, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + corner);
  shape.lineTo(hw, hh - hw);
  shape.absarc(0, hh - hw, hw, 0, Math.PI, false);
  shape.lineTo(-hw, -hh + corner);
  shape.quadraticCurveTo(-hw, -hh, -hw + corner, -hh);
  return shape;
}

/** ShapeGeometry UVs are in shape units; remap them to 0–1 over the card. */
function normalisedFace(shape: THREE.Shape, width: number, height: number) {
  const geometry = new THREE.ShapeGeometry(shape, 64);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, position.getX(i) / width + 0.5, position.getY(i) / height + 0.5);
  }
  uv.needsUpdate = true;
  return geometry;
}

/** Wax blob turned on a lathe, with an irregular rim so it reads as poured wax. */
function sealGeometry() {
  const profile = [
    [0, 0], [0.19, 0], [0.208, 0.01], [0.21, 0.026], [0.198, 0.04], [0.17, 0.05], [0, 0.05],
  ].map(([r, h]) => new THREE.Vector2(r, h));
  const geometry = new THREE.LatheGeometry(profile, 72);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const radius = Math.hypot(x, z);
    if (radius < 0.16) continue;
    const angle = Math.atan2(z, x);
    const wobble = 1 + 0.045 * Math.sin(angle * 5) + 0.025 * Math.sin(angle * 11 + 1.3);
    position.setXYZ(i, x * wobble, position.getY(i), z * wobble);
  }
  geometry.computeVertexNormals();
  return geometry;
}

export default function ProceduralInvitation({ onReady }: { onReady: () => void }) {
  const gl = useThree(state => state.gl);
  const { width, height } = EXPERIENCE.cardSize;

  const parts = useMemo(() => {
    const shape = archShape(width, height);
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: THICKNESS, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 2, curveSegments: 64,
    });
    body.translate(0, 0, -THICKNESS / 2);
    const face = normalisedFace(shape, width, height);
    const textures = createInvitationTextures(Math.min(8, gl.capabilities.getMaxAnisotropy()));

    const materials = {
      // ExtrudeGeometry groups: [0] caps (hidden under the faces), [1] edges.
      core: new THREE.MeshStandardMaterial({ color: '#f1e7d8', roughness: 0.9 }),
      gilt: new THREE.MeshStandardMaterial({ color: '#c9a15f', metalness: 1, roughness: 0.26 }),
      front: new THREE.MeshPhysicalMaterial({
        map: textures.front, roughnessMap: textures.frontSurface, metalnessMap: textures.frontSurface,
        roughness: 1, metalness: 1, sheen: 0.35, sheenColor: new THREE.Color('#fff1dc'), sheenRoughness: 0.8,
      }),
      back: new THREE.MeshPhysicalMaterial({
        map: textures.back, roughnessMap: textures.backSurface, metalnessMap: textures.backSurface,
        roughness: 1, metalness: 1, sheen: 0.35, sheenColor: new THREE.Color('#fff1dc'), sheenRoughness: 0.8,
      }),
      // Vellum: fully transmissive, lightly frosted.
      vellum: new THREE.MeshPhysicalMaterial({
        color: '#fff8ee', transmission: 1, roughness: 0.3, thickness: 0.06, ior: 1.5,
        attenuationColor: new THREE.Color('#f1dfc4'), attenuationDistance: 0.6,
      }),
      wax: new THREE.MeshPhysicalMaterial({ color: '#651220', roughness: 0.36, clearcoat: 0.7, clearcoatRoughness: 0.25 }),
      waxFace: new THREE.MeshPhysicalMaterial({ map: textures.seal, roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.2 }),
    };

    const bandHeight = height * BAND_HEIGHT_FRACTION;
    const band = new THREE.BoxGeometry(width + 0.03, bandHeight, THICKNESS + BEVEL * 2 + 0.018);
    const seal = sealGeometry();
    const sealFace = new THREE.CircleGeometry(0.155, 64);

    return {
      body, face, band, seal, sealFace, textures, materials,
      bandY: height / 2 - height * BAND_Y_FRACTION,
      bandFront: (THICKNESS + BEVEL * 2 + 0.018) / 2,
    };
  }, [gl, width, height]);

  useEffect(() => {
    let cancelled = false;
    // Redraw the artwork with the real web fonts before revealing the card.
    loadCardFonts().then(() => {
      if (cancelled) return;
      parts.textures.redraw();
      onReady();
    });
    return () => { cancelled = true; };
  }, [parts, onReady]);

  useEffect(() => () => {
    parts.body.dispose(); parts.face.dispose(); parts.band.dispose(); parts.seal.dispose(); parts.sealFace.dispose();
    parts.textures.dispose();
    Object.values(parts.materials).forEach(material => material.dispose());
  }, [parts]);

  const { materials } = parts;
  return (
    <group>
      <mesh geometry={parts.body} material={[materials.core, materials.gilt]} />
      <mesh geometry={parts.face} material={materials.front} position-z={FACE_Z} />
      <mesh geometry={parts.face} material={materials.back} position-z={-FACE_Z} rotation-y={Math.PI} />
      <mesh geometry={parts.band} material={materials.vellum} position-y={parts.bandY} />
      <group position={[0, parts.bandY, parts.bandFront]}>
        {/* Lathe axis is Y; tip it forward so the seal stands off the band toward the viewer. */}
        <mesh geometry={parts.seal} material={materials.wax} rotation-x={Math.PI / 2} />
        <mesh geometry={parts.sealFace} material={materials.waxFace} position-z={0.0508} />
      </group>
    </group>
  );
}
