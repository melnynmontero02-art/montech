"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { scrollState } from "@/lib/scroll";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import {
  ArrowRight, ShoppingCart, Globe, MessageCircle,
  Users, Code2, FileText, CheckCircle2, Send,
} from "lucide-react";

const WebGLScene = dynamic(() => import("@/components/canvas/WebGLScene"), { ssr: false });

/* ── Custom cursor ── */
function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;
    let rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      dot.style.left  = e.clientX + "px";
      dot.style.top   = e.clientY + "px";
      rx += (e.clientX - rx) * 0.14;
      ry += (e.clientY - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
    };
    const raf = () => { requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}

/* ── Scroll tracker ── */
function useScrollTracker() {
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const p = window.scrollY / total;
      scrollState.velocity = p - scrollState.progress;
      scrollState.progress = p;
      scrollState._prevY = window.scrollY;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

/* ── Reveal animation ── */
const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={reveal} custom={i}
      initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="scene-section min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="eyebrow mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
        Tecnología que moderniza negocios
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="heading-xl text-white mb-4 max-w-5xl"
      >
        Modernizamos
        <br />
        <span className="text-gradient">tu negocio</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="text-lg md:text-xl text-slate-400 max-w-xl mb-3 leading-relaxed"
      >
        con sistemas, webs y{" "}
        <span className="text-gradient-blue font-semibold">automatización de WhatsApp 24/7</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="text-sm text-slate-600 max-w-lg mb-10"
      >
        Creamos soluciones digitales a medida para que tu negocio venda más,
        trabaje organizado y se vea como una empresa grande.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a href="#assessment" className="btn-primary">
          Solicitar evaluación gratis <ArrowRight size={16} />
        </a>
        <a href="#solutions" className="btn-ghost">Ver soluciones</a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <div className="w-px h-8 bg-gradient-to-b from-slate-700 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION 2 — CHAOS
══════════════════════════════════════ */
const chaosItems = [
  { icon: "📊", text: "Excel desordenado", sub: "Datos perdidos, errores constantes" },
  { icon: "💬", text: "Mensajes sin responder", sub: "Clientes esperando horas" },
  { icon: "📦", text: "Inventario sin control", sub: "No sabes qué tienes en stock" },
  { icon: "🧾", text: "Facturas manuales", sub: "Cobros olvidados, dinero perdido" },
  { icon: "😰", text: "Todo lo haces solo", sub: "Sin sistema, sin tiempo, sin escala" },
];

function ChaosSection() {
  return (
    <section id="chaos" className="scene-section min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full">
        <Reveal>
          <div className="eyebrow mb-6" style={{ color: "#F87171", borderColor: "rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            El problema
          </div>
        </Reveal>

        <Reveal i={1}>
          <h2 className="heading-lg text-white mb-4">
            ¿Así se ve tu{" "}
            <span style={{ background: "linear-gradient(135deg,#F87171,#FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              negocio hoy?
            </span>
          </h2>
        </Reveal>

        <Reveal i={2}>
          <p className="text-slate-500 text-base mb-10 max-w-xl">
            Miles de negocios en República Dominicana pierden clientes y dinero cada día por no tener los sistemas correctos.
          </p>
        </Reveal>

        <div className="space-y-3">
          {chaosItems.map((item, i) => (
            <Reveal key={i} i={i + 3}>
              <div
                className="flex items-center gap-4 p-4 rounded-2xl glass-card transition-all duration-300 hover:border-red-500/20"
                style={{ borderColor: "rgba(248,113,113,0.1)" }}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.text}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.sub}</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-red-500/60 animate-pulse" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal i={9}>
          <div
            className="mt-10 p-6 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, rgba(248,113,113,0.06), rgba(251,146,60,0.06))", border: "1px solid rgba(248,113,113,0.12)" }}
          >
            <p className="text-lg md:text-xl font-bold text-white">
              Tu negocio no necesita trabajar más duro.
              <br />
              <span style={{ background: "linear-gradient(90deg,#38BDF8,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Necesita trabajar más inteligente.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION 3 — TRANSFORMATION
══════════════════════════════════════ */
const transforms = [
  { from: "📒 Cuaderno manual",       to: "📊 Dashboard digital en tiempo real" },
  { from: "📋 Excel desordenado",     to: "🖥️ Sistema POS con reportes automáticos" },
  { from: "💬 Mensajes sin responder",to: "🤖 Automatización de WhatsApp 24/7" },
  { from: "😟 Ventas perdidas",       to: "✅ Clientes atendidos y organizados" },
  { from: "❓ Sin control de stock",  to: "📦 Inventario actualizado al segundo" },
];

function TransformSection() {
  return (
    <section id="transform" className="scene-section min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full">
        <Reveal>
          <div className="eyebrow mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            La transformación
          </div>
        </Reveal>
        <Reveal i={1}>
          <h2 className="heading-lg text-white mb-10">
            De <span className="text-red-400">caos</span> a{" "}
            <span className="text-gradient">sistema</span>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {transforms.map((t, i) => (
            <Reveal key={i} i={i + 2}>
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3">
                <div className="glass-card rounded-xl px-4 py-3 text-center">
                  <span className="text-sm text-slate-400">{t.from}</span>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)", boxShadow: "0 0 16px rgba(56,189,248,0.4)" }}
                >
                  <ArrowRight size={13} className="text-white" />
                </div>
                <div
                  className="rounded-xl px-4 py-3 text-center"
                  style={{ background: "linear-gradient(135deg,rgba(56,189,248,0.08),rgba(167,139,250,0.08))", border: "1px solid rgba(56,189,248,0.18)" }}
                >
                  <span className="text-sm text-white font-medium">{t.to}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION 4 — SOLUTIONS
══════════════════════════════════════ */
const solutions = [
  { icon: ShoppingCart, color: "#38BDF8", title: "Sistema POS",           desc: "Vende y controla inventario en tiempo real desde cualquier dispositivo." },
  { icon: Globe,        color: "#A78BFA", title: "Página Web Moderna",    desc: "Tu negocio en internet con diseño premium que convierte visitas en ventas." },
  { icon: MessageCircle,color: "#22D3EE", title: "WhatsApp 24/7",         desc: "Responde clientes, cierra ventas y envía info automáticamente, todo el día." },
  { icon: Users,        color: "#34D399", title: "CRM para Clientes",     desc: "Gestiona contactos, historial y seguimiento de prospectos." },
  { icon: FileText,     color: "#FB923C", title: "Facturación",           desc: "Emite facturas legales y controla cobros automáticamente." },
  { icon: Code2,        color: "#818CF8", title: "Sistemas Personalizados",desc: "Si no existe, lo construimos. Tu proceso, digitalizado." },
];

function SolutionsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="solutions" className="scene-section min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <Reveal className="text-center mb-12">
          <div className="eyebrow mx-auto w-fit mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Nuestras soluciones
          </div>
          <h2 className="heading-lg text-white">
            Todo lo que tu negocio{" "}
            <span className="text-gradient">necesita</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <Reveal key={i} i={i * 0.5}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-2xl p-6 h-full relative overflow-hidden cursor-default"
                style={{ borderColor: `${s.color}22` }}
              >
                {/* Hover glow */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}14 0%, transparent 65%)` }}
                    />
                  )}
                </AnimatePresence>

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, boxShadow: `0 0 18px ${s.color}18` }}
                >
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION 5 — ASSESSMENT (interactive)
══════════════════════════════════════ */
const WA = "18293430288";
const svcOpts = [
  { k: "pos",  l: "Sistema POS" },
  { k: "web",  l: "Página Web" },
  { k: "wa",   l: "WhatsApp 24/7" },
  { k: "crm",  l: "CRM" },
  { k: "fact", l: "Facturación" },
  { k: "sys",  l: "Sistema personalizado" },
];
const budgetOpts = [
  { k: "a", l: "RD$10,000 – RD$25,000" },
  { k: "b", l: "RD$25,000 – RD$50,000" },
  { k: "c", l: "RD$50,000 – RD$100,000" },
  { k: "d", l: "Más de RD$100,000" },
];

function AssessmentSection() {
  const [svcs, setSvcs] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [biz, setBiz] = useState("");

  function toggleSvc(k: string) {
    setSvcs(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const selSvcs = svcOpts.filter(s => svcs.includes(s.k)).map(s => `• ${s.l}`).join("\n");
    const selBudget = budgetOpts.find(b => b.k === budget)?.l ?? "No especificado";
    const msg = encodeURIComponent(
      `🚀 *Evaluación MONTECH*\n\n👤 *Nombre:* ${name}\n📱 *WhatsApp:* ${phone}\n🏪 *Negocio:* ${biz}\n\n💡 *Soluciones:*\n${selSvcs || "• No especificado"}\n\n💰 *Presupuesto:* ${selBudget}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
  }

  const inp = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none focus:border-brand-blue/50 transition-all";

  return (
    <section id="assessment" className="scene-section min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full">
        <Reveal className="text-center mb-10">
          <div className="eyebrow mx-auto w-fit mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Evaluación gratis
          </div>
          <h2 className="heading-md text-white mb-3">
            ¿Qué necesita <span className="text-gradient">tu negocio?</span>
          </h2>
          <p className="text-slate-500 text-sm">Cuéntanos y te enviamos una propuesta personalizada.</p>
        </Reveal>

        <Reveal i={1}>
          <form onSubmit={submit} className="glass-card rounded-3xl p-7 md:p-9 space-y-7">
            {/* Services */}
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">¿Qué solución necesitas?</p>
              <div className="flex flex-wrap gap-2">
                {svcOpts.map(s => {
                  const on = svcs.includes(s.k);
                  return (
                    <button key={s.k} type="button" onClick={() => toggleSvc(s.k)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: on ? "linear-gradient(135deg,rgba(56,189,248,0.18),rgba(167,139,250,0.18))" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${on ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.08)"}`,
                        color: on ? "#F1F5F9" : "#94A3B8",
                        boxShadow: on ? "0 0 14px rgba(56,189,248,0.15)" : "none",
                      }}>
                      {on && <CheckCircle2 size={12} />}{s.l}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">Presupuesto estimado</p>
              <div className="grid grid-cols-2 gap-2">
                {budgetOpts.map(b => {
                  const on = budget === b.k;
                  return (
                    <button key={b.k} type="button" onClick={() => setBudget(b.k)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                      style={{
                        background: on ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${on ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.08)"}`,
                        color: on ? "#F1F5F9" : "#94A3B8",
                      }}>
                      {b.l}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5">Tu nombre *</p>
                <input className={inp} placeholder="Juan Pérez" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1.5">WhatsApp *</p>
                <input className={inp} placeholder="829-343-0288" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1.5">Nombre del negocio *</p>
              <input className={inp} placeholder="Tienda La Esperanza" value={biz} onChange={e => setBiz(e.target.value)} required />
            </div>

            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="btn-primary w-full text-base py-4">
              <Send size={17} /> Enviar evaluación por WhatsApp
            </motion.button>
            <p className="text-xs text-slate-600 text-center">Se abrirá WhatsApp con tu información organizada.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION 6 — FINAL CINEMATIC
══════════════════════════════════════ */
function FinalSection() {
  return (
    <section className="scene-section min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.1) 0%, rgba(167,139,250,0.07) 40%, transparent 70%)" }} />

      <Reveal>
        <div className="eyebrow mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          Empieza hoy
        </div>
      </Reveal>

      <Reveal i={1}>
        <p className="text-slate-500 text-sm tracking-[0.25em] uppercase mb-4">Build systems that help businesses grow.</p>
      </Reveal>

      <Reveal i={2}>
        <h2
          className="font-black text-white leading-none tracking-tighter mb-6 select-none"
          style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)" }}
        >
          MODERNIZE
          <br />
          <span className="text-gradient" style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}>YOUR</span>
          <br />
          BUSINESS
        </h2>
      </Reveal>

      <Reveal i={3}>
        <div
          className="font-black tracking-[0.15em] mb-10"
          style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", background: "linear-gradient(90deg,#38BDF8,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          MONTECH
        </div>
      </Reveal>

      <Reveal i={4}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a href="#assessment" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-primary text-base px-10 py-4">
            Solicitar evaluación ahora <ArrowRight size={17} />
          </motion.a>
          <motion.a href="#solutions" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost text-base px-10 py-4">
            Ver soluciones
          </motion.a>
        </div>
      </Reveal>

      <Reveal i={5}>
        <p className="mt-10 text-xs text-slate-600 tracking-wide">
          ✦ Evaluación gratis · Sin contrato · Propuesta en 24h ✦
        </p>
      </Reveal>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.04] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-sm font-black text-white tracking-tight">
          MON<span className="text-gradient">TECH</span>
        </span>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} MONTECH · República Dominicana</p>
        <div className="flex gap-5 text-xs text-slate-600">
          {["Soluciones","Evaluación","Contacto"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-slate-300 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   ROOT PAGE
══════════════════════════════════════ */
export default function Home() {
  useScrollTracker();

  return (
    <SmoothScroll>
      <Cursor />

      {/* Fixed 3D canvas behind everything */}
      <WebGLScene />

      {/* Cinematic scan-lines */}
      <div className="scanlines" />

      {/* Scrollable content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ChaosSection />
        <TransformSection />
        <SolutionsSection />
        <AssessmentSection />
        <FinalSection />
      </div>
    </SmoothScroll>
  );
}
