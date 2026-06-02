"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";
import Laptop from "./Laptop";
import Phone from "./Phone";
import Particles from "./Particles";

/* ── Camera waypoints ── */
const WAYPOINTS = [
  { p: 0.00, pos: [0,   1.2,  6.2], look: [0, 0.2, 0] },
  { p: 0.17, pos: [-1.8, 1.6,  5.5], look: [0, 0.3, 0] },
  { p: 0.34, pos: [0,   2.8,  7.8], look: [0, 0.2, 0] },
  { p: 0.51, pos: [3.5, 1.4,  4.2], look: [0, 0.5, 0] },
  { p: 0.68, pos: [0,   0.6,  5.8], look: [0, 0,   0] },
  { p: 1.00, pos: [0,   2.2, 11.5], look: [0, 0.5, 0] },
] as const;

const _posA = new THREE.Vector3();
const _posB = new THREE.Vector3();
const _lookA = new THREE.Vector3();
const _lookB = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function getCameraTarget(progress: number) {
  let i = 0;
  for (; i < WAYPOINTS.length - 2; i++) {
    if (progress <= WAYPOINTS[i + 1].p) break;
  }
  const a = WAYPOINTS[i], b = WAYPOINTS[i + 1];
  const range = b.p - a.p;
  const t = range === 0 ? 1 : Math.max(0, Math.min(1, (progress - a.p) / range));
  const e = easeInOut(t);
  _posA.set(...(a.pos as [number, number, number]));
  _posB.set(...(b.pos as [number, number, number]));
  _lookA.set(...(a.look as [number, number, number]));
  _lookB.set(...(b.look as [number, number, number]));
  _targetPos.lerpVectors(_posA, _posB, e);
  _targetLook.lerpVectors(_lookA, _lookB, e);
}

/* ── Floating abstract rings ── */
function Ring({ radius, color, y, speed }: { radius: number; color: string; y: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * speed * 0.3;
    ref.current.rotation.z = clock.elapsedTime * speed * 0.5;
  });
  return (
    <mesh ref={ref} position={[0, y, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </mesh>
  );
}

/* ── Ambient light orbs (glow spheres) ── */
function GlowOrb({ position, color, intensity }: { position: [number,number,number]; color: string; intensity: number }) {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.intensity = intensity + Math.sin(clock.elapsedTime * 0.7 + intensity) * 0.3;
  });
  return <pointLight ref={ref} position={position} color={color} intensity={intensity} distance={14} decay={2} />;
}

/* ── Main experience ── */
export default function Experience() {
  const { camera } = useThree();
  const camPos = useRef(new THREE.Vector3(0, 1.2, 6.2));
  const lookAt = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame((_, delta) => {
    getCameraTarget(scrollState.progress);
    camPos.current.lerp(_targetPos, Math.min(1, delta * 2.2));
    lookAt.current.lerp(_targetLook, Math.min(1, delta * 2.2));
    camera.position.copy(camPos.current);
    camera.lookAt(lookAt.current);
  });

  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.06} />

      {/* Key lights */}
      <GlowOrb position={[-6, 4, 4]}  color="#38BDF8" intensity={3.2} />
      <GlowOrb position={[ 6, 3, -4]} color="#A78BFA" intensity={2.4} />
      <GlowOrb position={[ 0, -4, 5]} color="#22D3EE" intensity={1.8} />

      {/* Scene objects */}
      <Particles />

      {/* Decorative rings */}
      <Ring radius={4.5} color="#38BDF8" y={0}    speed={0.4} />
      <Ring radius={6.5} color="#A78BFA" y={0.5}  speed={-0.3} />
      <Ring radius={3.2} color="#22D3EE" y={-0.5} speed={0.6} />

      {/* Devices */}
      <Laptop scrollProgress={scrollState} />
      <Phone  scrollProgress={scrollState} />

      {/* Ground reflection plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#010115"
          metalness={0.9}
          roughness={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}
