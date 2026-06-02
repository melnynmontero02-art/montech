"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPhone(ctx: CanvasRenderingContext2D, t: number) {
  const W = 256, H = 512;

  // Background
  ctx.fillStyle = "#06080f"; ctx.fillRect(0, 0, W, H);

  // Status bar
  ctx.fillStyle = "#0a0e1a"; ctx.fillRect(0, 0, W, 20);
  ctx.fillStyle = "#4a5568"; ctx.font = "8px sans-serif";
  ctx.fillText("9:41", 12, 14);
  ctx.fillStyle = "#22D3EE"; ctx.fillText("●●●●", W - 40, 14);

  // Header
  ctx.fillStyle = "#0d1f33"; ctx.fillRect(0, 20, W, 52);
  ctx.fillStyle = "#22BF6A"; ctx.beginPath(); ctx.arc(36, 46, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "bold 14px sans-serif"; ctx.fillText("M", 29, 51);
  ctx.fillStyle = "#fff"; ctx.font = "bold 12px sans-serif"; ctx.fillText("Mi Tienda", 62, 42);
  const dotAlpha = 0.4 + Math.sin(t * 2.5) * 0.4;
  ctx.fillStyle = `rgba(34,211,238,${dotAlpha})`;
  ctx.beginPath(); ctx.arc(62, 55, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#22D3EE"; ctx.font = "8.5px sans-serif";
  ctx.fillText("Automatización 24/7", 72, 58);

  // Separator
  ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 72); ctx.lineTo(W, 72); ctx.stroke();

  // Messages
  const msgs = [
    { f: "c", t: "Hola, tienen camisa M?", time: "9:41" },
    { f: "b", t: "¡Hola! 👋 Sí, varios modelos. ¿Color?", time: "9:41" },
    { f: "c", t: "Azul marino", time: "9:42" },
    { f: "b", t: "Azul M en RD$850. ¿La reservamos? 🛍️", time: "9:42" },
    { f: "c", t: "Sí, la quiero", time: "9:43" },
    { f: "b", t: "✅ Reservada. Te enviamos el link de pago.", time: "9:43" },
  ];

  let yPos = 82;
  msgs.forEach(msg => {
    const isBot = msg.f === "b";
    const bW = 170;

    if (isBot) {
      ctx.fillStyle = "rgba(56,189,248,0.14)";
      rr(ctx, W - bW - 10, yPos, bW, 30, 8); ctx.fill();
      ctx.strokeStyle = "rgba(56,189,248,0.2)"; ctx.lineWidth = 0.5;
      rr(ctx, W - bW - 10, yPos, bW, 30, 8); ctx.stroke();
      ctx.fillStyle = "#e2e8f0"; ctx.font = "8.5px sans-serif";
      ctx.fillText(msg.t.substring(0, 26), W - bW - 4, yPos + 14);
      if (msg.t.length > 26) ctx.fillText(msg.t.substring(26), W - bW - 4, yPos + 25);
      ctx.fillStyle = "#475569"; ctx.font = "7px sans-serif";
      ctx.fillText(msg.time, W - 28, yPos + 26);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      rr(ctx, 10, yPos, bW, 30, 8); ctx.fill();
      ctx.fillStyle = "#cbd5e1"; ctx.font = "8.5px sans-serif";
      ctx.fillText(msg.t, 16, yPos + 14);
      ctx.fillStyle = "#475569"; ctx.font = "7px sans-serif";
      ctx.fillText(msg.time, 14, yPos + 26);
    }
    yPos += 38;
  });

  // Typing indicator (animated)
  if (Math.sin(t * 1.8) > 0.2) {
    ctx.fillStyle = "rgba(56,189,248,0.12)";
    rr(ctx, W - 70, yPos, 58, 26, 8); ctx.fill();
    const dots = [0, 1, 2].map(i => Math.sin(t * 4 + i * 1.2) > 0 ? "#38BDF8" : "#1e3a4a");
    dots.forEach((c, i) => {
      ctx.fillStyle = c; ctx.beginPath();
      ctx.arc(W - 55 + i * 12, yPos + 13, 3.5, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Input bar
  ctx.fillStyle = "#090e1a"; ctx.fillRect(0, H - 46, W, 46);
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  rr(ctx, 10, H - 36, W - 56, 26, 13); ctx.fill();
  ctx.fillStyle = "#334155"; ctx.font = "9px sans-serif";
  ctx.fillText("Escribe un mensaje...", 20, H - 20);
  ctx.fillStyle = "#22BF6A"; ctx.beginPath();
  ctx.arc(W - 22, H - 22, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.fillText("▶", W - 29, H - 17);
}

export default function Phone({ scrollProgress }: { scrollProgress: { progress: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  const { texture } = useMemo(() => {
    if (typeof window === "undefined") return { texture: null };
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 512;
    const tex = new THREE.CanvasTexture(canvas);
    return { texture: tex };
  }, []);

  const bodyMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#0c0c18", metalness: 0.9, roughness: 0.08 }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.position.y = 0.3 + Math.sin(t * 0.6 + 1.5) * 0.1;
    groupRef.current.rotation.y = 0.35 + Math.sin(t * 0.3) * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.03;

    if (texture) {
      const canvas = texture.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) { drawPhone(ctx, t); texture.needsUpdate = true; }
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 0.8 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0.3, 0.4]} scale={0.85}>
      {/* Phone body */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[0.78, 1.65, 0.09]} />
      </mesh>
      {/* Notch */}
      <mesh material={bodyMat} position={[0, 0.77, 0.046]}>
        <boxGeometry args={[0.2, 0.04, 0.005]} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.047]}>
        <planeGeometry args={[0.7, 1.52]} />
        <meshBasicMaterial map={texture ?? undefined} toneMapped={false} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.048]}>
        <planeGeometry args={[0.7, 1.52]} />
        <meshBasicMaterial color="#22BF6A" transparent opacity={0.03} depthWrite={false} />
      </mesh>
      {/* Home bar */}
      <mesh position={[0, -0.72, 0.048]}>
        <planeGeometry args={[0.22, 0.018]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
      <pointLight
        ref={screenLightRef}
        position={[0, 0, 0.8]}
        color="#22BF6A"
        intensity={0.8}
        distance={2}
        decay={2}
      />
    </group>
  );
}
