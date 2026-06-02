"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 280;

export default function Particles() {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color("#38BDF8"),
      new THREE.Color("#A78BFA"),
      new THREE.Color("#22D3EE"),
      new THREE.Color("#818CF8"),
    ];

    for (let i = 0; i < COUNT; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3]     = r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(phi) + (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.018;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.08;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
