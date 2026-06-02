"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import Experience from "./Experience";

export default function WebGLScene() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 6], fov: 42, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={["#000008"]} />
        <fog attach="fog" args={["#000008", 15, 40]} />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}
