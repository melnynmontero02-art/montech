"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────────
   CANVAS HELPERS
───────────────────────────────────────── */
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawDashboard(ctx: CanvasRenderingContext2D, t: number, W: number, H: number) {
  ctx.fillStyle = "#05071a"; ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "rgba(56,189,248,0.05)"; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Header bar
  ctx.fillStyle = "#080d24"; ctx.fillRect(0, 0, W, 32);
  ctx.fillStyle = "#38BDF8"; ctx.font = "bold 11px monospace"; ctx.fillText("MONTECH  POS", 14, 21);
  const pulse = 0.5 + Math.sin(t * 3) * 0.5;
  ctx.fillStyle = `rgba(34,211,238,${pulse})`; ctx.beginPath(); ctx.arc(W - 16, 16, 4.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(34,211,238,0.5)"; ctx.font = "8px sans-serif"; ctx.fillText("LIVE", W - 35, 21);

  // Metric cards
  const revenue = (45230 + Math.sin(t * 0.4) * 800).toFixed(0);
  const metrics = [
    { label: "Ventas hoy", value: `RD$${revenue}`, color: "#38BDF8", x: 12 },
    { label: "Productos",  value: "1,247",          color: "#A78BFA", x: 12 + (W - 36) / 3 + 6 },
    { label: "Clientes",   value: "3,841",           color: "#22D3EE", x: 12 + ((W - 36) / 3 + 6) * 2 },
  ];
  const mw = (W - 48) / 3;
  metrics.forEach(m => {
    ctx.fillStyle = m.color + "12"; rr(ctx, m.x, 40, mw, 58, 7); ctx.fill();
    ctx.strokeStyle = m.color + "28"; ctx.lineWidth = 1; rr(ctx, m.x, 40, mw, 58, 7); ctx.stroke();
    ctx.fillStyle = "#64748b"; ctx.font = "9px sans-serif"; ctx.fillText(m.label, m.x + 10, 56);
    ctx.fillStyle = m.color; ctx.font = "bold 14px monospace"; ctx.fillText(m.value, m.x + 10, 83);
  });

  // Bar chart
  const cY = H - 48; const cH = cY - 112;
  ctx.fillStyle = "#475569"; ctx.font = "8px sans-serif"; ctx.fillText("Ventas del mes", 14, 114);
  const bars = [38, 55, 42, 70, 58, 85, 62, 78, 68, 92, 74, 100];
  const bW = (W * 0.55) / bars.length - 2;
  bars.forEach((h, i) => {
    const anim = h * (0.8 + Math.sin(t * 0.6 + i * 0.4) * 0.2);
    const bH = (anim / 100) * cH;
    const bX = 12 + i * (bW + 3);
    const grad = ctx.createLinearGradient(0, cY - bH, 0, cY);
    grad.addColorStop(0, i >= 10 ? "#38BDF8" : "rgba(56,189,248,0.6)");
    grad.addColorStop(1, i >= 10 ? "#A78BFA" : "rgba(56,189,248,0.1)");
    ctx.fillStyle = grad; rr(ctx, bX, cY - bH, bW, bH, 2); ctx.fill();
  });

  // Recent orders panel
  const px = W * 0.58; const pw = W - px - 10;
  ctx.fillStyle = "rgba(255,255,255,0.02)"; rr(ctx, px, 105, pw, cY - 105, 7); ctx.fill();
  ctx.strokeStyle = "rgba(56,189,248,0.08)"; ctx.lineWidth = 1; rr(ctx, px, 105, pw, cY - 105, 7); ctx.stroke();
  ctx.fillStyle = "#475569"; ctx.font = "8px sans-serif"; ctx.fillText("Pedidos recientes", px + 10, 120);

  const orders = [["Camisa XL", "RD$2,550"], ["Pantalón M", "RD$850"], ["Zapatos 42", "RD$4,200"], ["Blusa S", "RD$650"]];
  orders.forEach(([item, amt], i) => {
    const oy = 136 + i * 20;
    ctx.fillStyle = "#94a3b8"; ctx.font = "8.5px sans-serif"; ctx.fillText(item, px + 10, oy);
    ctx.fillStyle = "#22D3EE"; ctx.fillText(amt, px + pw - 65, oy);
  });

  // Bottom bar
  ctx.fillStyle = "#080d24"; ctx.fillRect(0, H - 26, W, 26);
  ctx.fillStyle = "#334155"; ctx.font = "8px sans-serif";
  ctx.fillText(`Sistema activo • ${new Date().toLocaleTimeString("es-DO")}`, 14, H - 8);
  ctx.fillStyle = "#22D3EE"; ctx.font = "bold 8px sans-serif";
  ctx.fillText("● Online", W - 55, H - 8);
}

function drawWhatsApp(ctx: CanvasRenderingContext2D, t: number, W: number, H: number) {
  ctx.fillStyle = "#06080f"; ctx.fillRect(0, 0, W, H);

  // Status bar
  ctx.fillStyle = "#0a0e1a"; ctx.fillRect(0, 0, W, 22);
  ctx.fillStyle = "#4a5568"; ctx.font = "8px sans-serif"; ctx.fillText("9:41", 10, 15);
  ctx.fillStyle = "#22D3EE"; ctx.fillText("▪▪▪", W - 30, 15);

  // Header
  ctx.fillStyle = "#0d1f33"; ctx.fillRect(0, 22, W, 50);
  ctx.fillStyle = "#22BF6A"; ctx.beginPath(); ctx.arc(34, 47, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "bold 12px sans-serif"; ctx.fillText("M", 28, 52);
  ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.fillText("Mi Tienda", 58, 43);
  const da = 0.4 + Math.sin(t * 2.5) * 0.4;
  ctx.fillStyle = `rgba(34,211,238,${da})`; ctx.beginPath(); ctx.arc(58, 55, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#22D3EE"; ctx.font = "7.5px sans-serif"; ctx.fillText("Automático 24/7", 66, 58);

  // Messages
  const msgs = [
    { f: "c", txt: "Hola, tienen camisa talla M?" },
    { f: "b", txt: "¡Hola! 👋 Claro, varios colores." },
    { f: "c", txt: "Azul marino, cuánto?" },
    { f: "b", txt: "Azul M en RD$850. ¿La aparto? 🛍️" },
    { f: "c", txt: "Sí!" },
    { f: "b", txt: "✅ Apartada. Te enviamos el pago." },
  ];

  let yp = 80;
  msgs.forEach(m => {
    const isBot = m.f === "b";
    const bw = W * 0.78;
    const bx = isBot ? W - bw - 8 : 8;
    ctx.fillStyle = isBot ? "rgba(56,189,248,0.14)" : "rgba(255,255,255,0.07)";
    rr(ctx, bx, yp, bw, 26, 7); ctx.fill();
    if (isBot) { ctx.strokeStyle = "rgba(56,189,248,0.2)"; ctx.lineWidth = 0.5; rr(ctx, bx, yp, bw, 26, 7); ctx.stroke(); }
    ctx.fillStyle = "#e2e8f0"; ctx.font = "8px sans-serif";
    ctx.fillText(m.txt.substring(0, 32), bx + 8, yp + 17);
    yp += 34;
  });

  // Typing dots
  if (Math.sin(t * 1.8) > 0.3) {
    ctx.fillStyle = "rgba(56,189,248,0.12)"; rr(ctx, W - 65, yp, 55, 22, 7); ctx.fill();
    [0,1,2].forEach(i => {
      ctx.fillStyle = Math.sin(t * 4 + i * 1.2) > 0 ? "#38BDF8" : "#1e3a4a";
      ctx.beginPath(); ctx.arc(W - 50 + i * 11, yp + 11, 3, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Input bar
  ctx.fillStyle = "#090e1a"; ctx.fillRect(0, H - 40, W, 40);
  ctx.fillStyle = "rgba(255,255,255,0.05)"; rr(ctx, 8, H - 31, W - 46, 22, 11); ctx.fill();
  ctx.fillStyle = "#334155"; ctx.font = "8.5px sans-serif"; ctx.fillText("Mensaje...", 18, H - 16);
  ctx.fillStyle = "#22BF6A"; ctx.beginPath(); ctx.arc(W - 18, H - 20, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.fillText("▶", W - 24, H - 15);
}

/* ─────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);

    const N = 140;
    const pal = ["#38BDF8", "#A78BFA", "#22D3EE", "#818CF8"];
    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.4 + 0.4,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      color: pal[Math.floor(Math.random() * pal.length)],
      a: Math.random() * 0.5 + 0.15,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach(d => {
        d.x += d.dx; d.y += d.dy;
        if (d.x < 0 || d.x > c.width)  d.dx *= -1;
        if (d.y < 0 || d.y > c.height) d.dy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color + Math.round(d.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ─────────────────────────────────────────
   LAPTOP SCREEN
───────────────────────────────────────── */
function LaptopScreen() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = c.width, H = c.height;
    let raf: number;
    const draw = () => {
      drawDashboard(ctx, performance.now() / 1000, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={560} height={350} className="w-full h-full block" />;
}

/* ─────────────────────────────────────────
   PHONE SCREEN
───────────────────────────────────────── */
function PhoneScreen() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = c.width, H = c.height;
    let raf: number;
    const draw = () => {
      drawWhatsApp(ctx, performance.now() / 1000, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={220} height={440} className="w-full h-full block" />;
}

/* ─────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────── */
function TiltCard({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width * 2 - 1);
    my.set((e.clientY - r.top)  / r.height * 2 - 1);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 800, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN SCENE
───────────────────────────────────────── */
export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Particle background */}
      <Particles />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute animate-orb-1" style={{
          top: "-10%", left: "-10%", width: "55vw", height: "55vw",
          background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)",
          filter: "blur(40px)",
        }} />
        <div className="absolute animate-orb-2" style={{
          bottom: "-10%", right: "-10%", width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 65%)",
          filter: "blur(40px)",
        }} />
        <div className="absolute" style={{
          top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 65%)",
          filter: "blur(30px)",
        }} />
      </div>

      {/* Devices — hero area */}
      <div
        className="absolute flex items-center justify-center gap-6 md:gap-10"
        style={{
          bottom: "5%", left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: "900px",
        }}
      >
        {/* Laptop */}
        <TiltCard style={{ flexShrink: 0 }}>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Screen frame */}
            <div style={{
              width: "clamp(280px, 45vw, 560px)",
              background: "linear-gradient(145deg, #090918, #10102a)",
              borderRadius: "14px 14px 0 0",
              border: "1px solid rgba(56,189,248,0.18)",
              boxShadow: "0 0 60px rgba(56,189,248,0.14), 0 30px 80px rgba(0,0,0,0.9)",
              overflow: "hidden",
            }}>
              {/* Chrome bar */}
              <div style={{ padding: "7px 10px", background: "#080d22", display: "flex", alignItems: "center", gap: 5 }}>
                {["#EF4444","#F59E0B","#22C55E"].map((c,i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                ))}
                <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.04)", borderRadius: 4, margin: "0 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 8, color: "#475569" }}>montech.pos</span>
                </div>
              </div>
              <LaptopScreen />
            </div>
            {/* Base notch */}
            <div style={{ height: 8, background: "#070714", borderRadius: "0 0 14px 14px", border: "1px solid rgba(56,189,248,0.1)", borderTop: "none" }} />
          </motion.div>
        </TiltCard>

        {/* Phone */}
        <TiltCard style={{ flexShrink: 0 }}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div style={{
              width: "clamp(100px, 14vw, 180px)",
              background: "linear-gradient(145deg, #090918, #10102a)",
              borderRadius: "22px",
              border: "1px solid rgba(34,197,94,0.2)",
              boxShadow: "0 0 40px rgba(34,197,94,0.1), 0 20px 60px rgba(0,0,0,0.8)",
              overflow: "hidden",
            }}>
              {/* Notch */}
              <div style={{ display: "flex", justifyContent: "center", padding: "6px 0 4px" }}>
                <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4 }} />
              </div>
              <PhoneScreen />
              {/* Home bar */}
              <div style={{ display: "flex", justifyContent: "center", padding: "5px 0 7px" }}>
                <div style={{ width: 50, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 4 }} />
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>

      {/* Decorative rings */}
      {[
        { r: "200px", color: "rgba(56,189,248,0.06)",   top: "20%", left: "8%",  rot: "35deg" },
        { r: "280px", color: "rgba(167,139,250,0.05)",  top: "55%", right: "5%", rot: "-20deg" },
        { r: "150px", color: "rgba(34,211,238,0.07)",   top: "10%", right: "18%",rot: "15deg" },
      ].map((ring, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [parseInt(ring.rot), parseInt(ring.rot) + 360] }}
          transition={{ duration: 25 + i * 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", width: ring.r, height: ring.r,
            borderRadius: "50%",
            border: `1px solid ${ring.color}`,
            top: ring.top, left: (ring as {left?: string}).left, right: (ring as {right?: string}).right,
          }}
        />
      ))}
    </div>
  );
}
