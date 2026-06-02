"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, TrendingUp, Package, Users, ShoppingCart } from "lucide-react";

/* ── Floating stats card ── */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  className,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`glass-card rounded-2xl px-4 py-3 flex items-center gap-3 ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ boxShadow: `0 0 24px ${color}22` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <p className="text-[11px] text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-bold text-white leading-none mt-0.5">{value}</p>
      </div>
    </motion.div>
  );
}

/* ── Dashboard mockup ── */
function DashboardMockup() {
  const bars = [38, 55, 42, 70, 58, 85, 62, 78, 68, 92, 74, 100];
  return (
    <div className="w-full h-full bg-[#05071a] p-3 flex flex-col gap-2 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
          <span className="text-[9px] font-bold text-slate-300 tracking-wider">MONTECH POS</span>
        </div>
        <div className="flex gap-1">
          {["#38BDF8","#A78BFA","#22D3EE"].map((c,i)=>(
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Ventas hoy", value: "RD$45,230", color: "#38BDF8" },
          { label: "Productos", value: "1,247", color: "#A78BFA" },
          { label: "Clientes", value: "3,841", color: "#22D3EE" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg p-1.5" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <p className="text-[8px] text-slate-500">{s.label}</p>
            <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="flex-1 rounded-lg bg-white/[0.02] p-2">
        <p className="text-[8px] text-slate-500 mb-1.5">Ventas del mes</p>
        <div className="flex items-end gap-0.5 h-10">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all"
              style={{
                height: `${h}%`,
                background: i >= 10
                  ? "linear-gradient(to top, #38BDF8, #A78BFA)"
                  : "rgba(56,189,248,0.25)",
              }}
            />
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="space-y-1">
        {[
          ["Camisa polo XL", "×3", "+RD$2,100"],
          ["Pantalón slim M", "×1", "+RD$850"],
          ["Zapatos negros", "×2", "+RD$3,400"],
        ].map(([item, qty, amt], i) => (
          <div key={i} className="flex items-center justify-between border-b border-white/[0.04] pb-0.5">
            <span className="text-[8px] text-slate-400">{item}</span>
            <span className="text-[8px] text-slate-500">{qty}</span>
            <span className="text-[8px] font-semibold text-emerald-400">{amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── WhatsApp mockup ── */
function WhatsAppMockup() {
  const msgs = [
    { from: "client", text: "Hola, ¿tienen camisa talla M?" },
    { from: "bot", text: "¡Hola! 👋 Sí, tenemos varios modelos. ¿Qué color prefieres?" },
    { from: "client", text: "Azul marino, ¿cuánto cuesta?" },
    { from: "bot", text: "La camisa azul marino M está en RD$850. ¿La reservamos para ti? 🛍️" },
    { from: "client", text: "Sí, la quiero" },
    { from: "bot", text: "✅ Perfecto, reservada. Te enviamos el pago por aquí. ¡Gracias!" },
  ];
  return (
    <div className="w-full h-full bg-[#05071a] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-white/[0.06]" style={{ background: "#111827" }}>
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">W</span>
        </div>
        <div>
          <p className="text-[9px] font-bold text-white">Mi Tienda</p>
          <p className="text-[7px] text-emerald-400">● Automático 24/7</p>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden" style={{ background: "#050a14" }}>
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "client" ? "justify-start" : "justify-end"}`}>
            <div
              className="max-w-[75%] px-2 py-1 rounded-lg text-[8px] leading-snug"
              style={{
                background: m.from === "client" ? "rgba(255,255,255,0.07)" : "rgba(56,189,248,0.15)",
                border: m.from === "bot" ? "1px solid rgba(56,189,248,0.2)" : "none",
                color: "#e2e8f0",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input bar */}
      <div className="px-2 py-1.5 flex items-center gap-1.5 border-t border-white/[0.04]">
        <div className="flex-1 h-5 rounded-full bg-white/[0.05] px-2 flex items-center">
          <span className="text-[7px] text-slate-600">Mensaje...</span>
        </div>
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <ArrowRight size={8} className="text-white" />
        </div>
      </div>
    </div>
  );
}

/* ── Particle canvas ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const dots: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${d.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── 3D tilt device wrapper ── */
function TiltDevice({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 120, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1200 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000008] pt-24 pb-12"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles />
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[700px] h-[700px] rounded-full animate-orb-1"
          style={{
            top: "-200px", left: "-150px",
            background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-orb-2"
          style={{
            bottom: "-100px", right: "-100px",
            background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full animate-orb-3"
          style={{
            top: "40%", left: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
            filter: "blur(20px)",
            transform: "translate(-50%,-50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow-blue mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-xs font-semibold text-brand-cyan tracking-wide uppercase">
            Tecnología digital para negocios
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-5"
        >
          <span className="block text-white">Modernizamos</span>
          <span className="block text-gradient">tu negocio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          con sistemas, webs y{" "}
          <span className="text-gradient-blue font-semibold">automatización de WhatsApp 24/7</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base text-slate-500 max-w-xl mx-auto mb-10"
        >
          Creamos soluciones digitales a medida para que tu negocio venda más,
          trabaje organizado y se vea como una empresa grande.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a href="#evaluacion" className="btn-primary">
            Solicitar evaluación gratis <ArrowRight size={16} />
          </a>
          <a href="#soluciones" className="btn-secondary">
            Ver soluciones
          </a>
        </motion.div>

        {/* Devices + floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-end justify-center gap-4 md:gap-6"
        >
          {/* Floating stats */}
          <StatCard
            icon={TrendingUp}
            label="Ventas en vivo"
            value="RD$45,230"
            color="#38BDF8"
            className="hidden lg:flex absolute -left-4 top-8 z-20"
          />
          <StatCard
            icon={Package}
            label="Inventario"
            value="1,247 items"
            color="#A78BFA"
            className="hidden md:flex absolute -left-2 bottom-12 z-20"
          />
          <StatCard
            icon={Users}
            label="Clientes"
            value="3,841 activos"
            color="#22D3EE"
            className="hidden lg:flex absolute -right-4 top-8 z-20"
          />
          <StatCard
            icon={ShoppingCart}
            label="Pedidos"
            value="128 hoy"
            color="#34D399"
            className="hidden md:flex absolute -right-2 bottom-12 z-20"
          />

          {/* Laptop */}
          <TiltDevice className="w-[280px] sm:w-[340px] md:w-[420px] lg:w-[480px] flex-shrink-0">
            <div
              className="relative rounded-xl overflow-hidden border border-brand-blue/20 glow-sm-blue"
              style={{
                background: "linear-gradient(135deg, #0a0e2a, #05071a)",
                boxShadow: "0 30px 80px rgba(0,0,8,0.9), 0 0 60px rgba(56,189,248,0.12)",
              }}
            >
              {/* Screen chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
                {["#EF4444","#F59E0B","#22C55E"].map((c,i)=>(
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
                ))}
                <div className="flex-1 mx-3 h-4 rounded bg-white/[0.04] flex items-center justify-center">
                  <span className="text-[8px] text-slate-500">montech.pos</span>
                </div>
              </div>
              <div className="h-[200px] sm:h-[240px] md:h-[280px]">
                <DashboardMockup />
              </div>
            </div>
            {/* Laptop base */}
            <div className="w-[105%] -ml-[2.5%] h-3 bg-[#0a0a1a] rounded-b-lg border border-t-0 border-brand-blue/10" />
          </TiltDevice>

          {/* Phone */}
          <TiltDevice className="w-[110px] sm:w-[130px] md:w-[150px] flex-shrink-0 mb-4">
            <div
              className="rounded-[20px] overflow-hidden border border-emerald-500/20"
              style={{
                background: "#06080f",
                boxShadow: "0 20px 60px rgba(0,0,8,0.8), 0 0 30px rgba(34,197,94,0.1)",
                height: "220px",
              }}
            >
              {/* Notch */}
              <div className="flex justify-center pt-1.5 pb-1">
                <div className="w-12 h-1 rounded-full bg-white/10" />
              </div>
              <div className="h-[190px]">
                <WhatsAppMockup />
              </div>
            </div>
          </TiltDevice>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
