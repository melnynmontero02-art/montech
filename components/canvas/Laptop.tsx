"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Canvas dashboard texture ── */
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawDashboard(ctx: CanvasRenderingContext2D, t: number) {
  const W = 512, H = 320;

  // Background
  ctx.fillStyle = "#05071a";
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = "rgba(56,189,248,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Top bar
  ctx.fillStyle = "#080d24";
  ctx.fillRect(0, 0, W, 26);
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 10px monospace";
  ctx.fillText("MONTECH  POS", 12, 17);
  // Live dot
  const alpha = 0.5 + Math.sin(t * 3) * 0.5;
  ctx.fillStyle = `rgba(34,211,238,${alpha})`;
  ctx.beginPath(); ctx.arc(W - 14, 13, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(34,211,238,0.3)";
  ctx.font = "8px sans-serif";
  ctx.fillText("LIVE", W - 30, 17);

  // Metric cards
  const revenue = (45230 + Math.sin(t * 0.4) * 800).toFixed(0);
  const metrics = [
    { label: "Ventas hoy", value: `RD$${revenue}`, color: "#38BDF8", x: 10 },
    { label: "Productos", value: "1,247", color: "#A78BFA", x: 180 },
    { label: "Clientes", value: "3,841", color: "#22D3EE", x: 350 },
  ];
  metrics.forEach(m => {
    ctx.fillStyle = `${m.color}12`;
    rr(ctx, m.x, 34, 155, 54, 6); ctx.fill();
    ctx.strokeStyle = `${m.color}30`; ctx.lineWidth = 1;
    rr(ctx, m.x, 34, 155, 54, 6); ctx.stroke();
    ctx.fillStyle = "#64748b"; ctx.font = "8px sans-serif";
    ctx.fillText(m.label, m.x + 8, 48);
    ctx.fillStyle = m.color; ctx.font = "bold 15px monospace";
    ctx.fillText(m.value, m.x + 8, 76);
  });

  // Chart label
  ctx.fillStyle = "#475569"; ctx.font = "8px sans-serif";
  ctx.fillText("Ventas del mes", 14, 106);

  // Bar chart
  const bars = [38, 55, 42, 70, 58, 85, 62, 78, 68, 92, 74, 100];
  bars.forEach((h, i) => {
    const anim = h * (0.8 + Math.sin(t * 0.6 + i * 0.4) * 0.2);
    const bH = (anim / 100) * 72;
    const bX = 14 + i * 21;
    const bY = 186 - bH;
    const isLast = i >= 10;
    const grad = ctx.createLinearGradient(0, bY, 0, 186);
    grad.addColorStop(0, isLast ? "#38BDF8" : "rgba(56,189,248,0.55)");
    grad.addColorStop(1, isLast ? "#A78BFA" : "rgba(56,189,248,0.1)");
    ctx.fillStyle = grad;
    rr(ctx, bX, bY, 17, bH, 2); ctx.fill();
  });

  // Orders panel
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  rr(ctx, 280, 95, 222, 100, 6); ctx.fill();
  ctx.strokeStyle = "rgba(56,189,248,0.08)"; ctx.lineWidth = 1;
  rr(ctx, 280, 95, 222, 100, 6); ctx.stroke();
  ctx.fillStyle = "#475569"; ctx.font = "8px sans-serif";
  ctx.fillText("Pedidos recientes", 290, 110);

  const orders = [["Camisa polo XL", "×3", "+RD$2,550"], ["Pantalón slim M", "×1", "+RD$850"], ["Zapatos cuero 42", "×2", "+RD$4,200"]];
  orders.forEach(([item, qty, amt], i) => {
    const y = 127 + i * 18;
    ctx.fillStyle = "#94a3b8"; ctx.font = "8.5px sans-serif"; ctx.fillText(item, 290, y);
    ctx.fillStyle = "#64748b"; ctx.fillText(qty, 405, y);
    ctx.fillStyle = "#22D3EE"; ctx.fillText(amt, 440, y);
  });

  // Bottom bar
  ctx.fillStyle = "#080d24"; ctx.fillRect(0, 200, W, 28);
  ctx.fillStyle = "#334155"; ctx.font = "8px sans-serif";
  ctx.fillText(`Sistema activo — ${new Date().toLocaleTimeString("es-DO")}`, 12, 219);
  ctx.fillStyle = "#22D3EE"; ctx.font = "bold 8px sans-serif";
  ctx.fillText("● MONTECH POS v2.0", W - 105, 219);

  // Blinking cursor
  if (Math.sin(t * 4) > 0) {
    ctx.fillStyle = "#38BDF8";
    ctx.fillRect(W - 118, 207, 1, 10);
  }
}

/* ── Laptop component ── */
export default function Laptop({ scrollProgress }: { scrollProgress: { progress: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  const { texture } = useMemo(() => {
    if (typeof window === "undefined") return { texture: null, canvas: null };
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 320;
    const tex = new THREE.CanvasTexture(canvas);
    return { texture: tex, canvas };
  }, []);

  // Metallic body material (shared)
  const bodyMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#0c0c18", metalness: 0.95, roughness: 0.06, reflectivity: 1 }),
    []
  );
  const darkMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#080810", metalness: 0.8, roughness: 0.15 }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!groupRef.current) return;

    // Float animation
    const p = scrollProgress.progress;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    groupRef.current.rotation.y = -0.25 + Math.sin(t * 0.25) * 0.04 + p * -0.3;

    // Update canvas texture
    if (texture) {
      const canvas = texture.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) { drawDashboard(ctx, t); texture.needsUpdate = true; }
    }

    // Pulse screen light
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 1.8 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.1}>
      {/* ── Keyboard base ── */}
      <mesh material={bodyMat} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
      </mesh>
      {/* Keyboard area */}
      <mesh material={darkMat} position={[0, 0.052, 0.1]}>
        <boxGeometry args={[2.1, 0.005, 1.2]} />
      </mesh>
      {/* Key rows (decorative) */}
      {[0, 0.25, 0.5, 0.75].map((zOff, i) => (
        <mesh key={i} material={darkMat} position={[0, 0.055, -0.1 + zOff * 0.9]}>
          <boxGeometry args={[1.9, 0.012, 0.07]} />
        </mesh>
      ))}
      {/* Trackpad */}
      <mesh material={darkMat} position={[0, 0.052, 0.55]}>
        <boxGeometry args={[0.65, 0.004, 0.42]} />
      </mesh>

      {/* ── Screen lid (hinged at back) ── */}
      <group position={[0, 0.05, -0.8]} rotation={[0.28, 0, 0]}>
        {/* Lid body */}
        <mesh material={bodyMat} position={[0, 0.76, 0]} castShadow>
          <boxGeometry args={[2.4, 1.52, 0.08]} />
        </mesh>
        {/* Screen bezel (dark inset) */}
        <mesh material={darkMat} position={[0, 0.76, 0.042]}>
          <boxGeometry args={[2.25, 1.42, 0.002]} />
        </mesh>
        {/* Screen face — dashboard texture */}
        <mesh position={[0, 0.76, 0.044]}>
          <planeGeometry args={[2.15, 1.35]} />
          <meshBasicMaterial map={texture ?? undefined} toneMapped={false} />
        </mesh>
        {/* Screen glow overlay */}
        <mesh position={[0, 0.76, 0.045]}>
          <planeGeometry args={[2.15, 1.35]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.04} depthWrite={false} />
        </mesh>
        {/* Screen edge emissive rim */}
        <mesh position={[0, 0.76, 0.043]}>
          <boxGeometry args={[2.18, 1.38, 0.001]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.12} wireframe />
        </mesh>
        {/* Light emitted by screen */}
        <pointLight
          ref={screenLightRef}
          position={[0, 0.76, 0.5]}
          color="#38BDF8"
          intensity={1.8}
          distance={3.5}
          decay={2}
        />
      </group>

      {/* Brand dot on lid back */}
      <group position={[0, 0.05, -0.8]} rotation={[0.28, 0, 0]}>
        <mesh position={[0, 0.76, -0.045]}>
          <circleGeometry args={[0.09, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}
