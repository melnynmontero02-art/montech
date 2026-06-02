"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { scrollState } from "@/lib/scroll";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import {
  ArrowRight, ShoppingCart, Globe, MessageCircle,
  Users, Code2, FileText, CheckCircle2, Send, Zap,
} from "lucide-react";

const WebGLScene = dynamic(() => import("@/components/canvas/WebGLScene"), { ssr: false });

/* ── Scroll tracker (updates module-level state for R3F) ── */
function useScrollTracker() {
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      scrollState.progress = window.scrollY / total;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

/* ── Custom cursor ── */
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    let raf: number;
    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (dotRef.current)  { dotRef.current.style.left  = mx + "px"; dotRef.current.style.top  = my + "px"; }
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);
  return (
    <>
      <div ref={dotRef}  id="cursor-dot"  />
      <div ref={ringRef} id="cursor-ring" />
    </>
  );
}

/* ── Reveal ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 z-10">
      <motion.div className="eyebrow mb-7"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
        Tecnología que moderniza negocios
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-white font-black leading-none tracking-tight mb-4"
        style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}>
        Modernizamos<br />
        <span className="text-gradient">tu negocio</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="text-lg md:text-xl text-slate-400 max-w-xl mb-2 leading-relaxed">
        con sistemas, webs y{" "}
        <span className="text-gradient-blue font-semibold">automatización de WhatsApp 24/7</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        className="text-sm text-slate-600 max-w-lg mb-10">
        Creamos soluciones digitales para que tu negocio venda más, trabaje organizado
        y se vea como una empresa grande.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4">
        <a href="#assessment" className="btn-primary">
          Solicitar evaluación gratis <ArrowRight size={16} />
        </a>
        <a href="#solutions" className="btn-ghost">Ver soluciones</a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700 pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
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
  { icon: "📊", title: "Excel desordenado",          sub: "Datos perdidos, errores constantes que cuestan dinero." },
  { icon: "💬", title: "Mensajes sin responder",      sub: "Clientes esperando horas en WhatsApp y se van a la competencia." },
  { icon: "📦", title: "Inventario sin control",      sub: "No sabes qué tienes en stock. Vendes cosas que no tienes." },
  { icon: "🧾", title: "Cobros y pagos manuales",     sub: "Facturas en papel, cobros olvidados, dinero que se pierde." },
  { icon: "😰", title: "Todo lo haces tú solo",       sub: "Sin sistema, sin automatización, sin tiempo para crecer." },
];

function ChaosSection() {
  return (
    <section id="chaos" className="relative z-10 py-24 px-6">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,8,0.85) 15%, rgba(0,0,8,0.95) 50%, rgba(0,0,8,0.85) 85%, transparent 100%)" }} />

      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <span className="eyebrow mb-6 block w-fit"
            style={{ color: "#F87171", borderColor: "rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.07)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            El problema
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-black text-white leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            ¿Así se ve tu{" "}
            <span style={{ background: "linear-gradient(135deg,#F87171,#FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              negocio hoy?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-slate-400 text-base mb-10 max-w-xl">
            Miles de negocios en República Dominicana pierden clientes y dinero cada día por no tener los sistemas correctos.
          </p>
        </Reveal>

        <div className="space-y-3">
          {chaosItems.map((item, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <div className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "rgba(10,12,30,0.8)", border: "1px solid rgba(248,113,113,0.1)", backdropFilter: "blur(12px)" }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.sub}</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-red-500/50 animate-pulse flex-shrink-0" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <div className="mt-10 p-7 rounded-3xl text-center"
            style={{ background: "rgba(8,12,35,0.9)", border: "1px solid rgba(56,189,248,0.12)", backdropFilter: "blur(16px)" }}>
            <p className="text-lg md:text-xl font-bold leading-snug text-white">
              Tu negocio no necesita trabajar más duro.
              <br />
              <span className="text-gradient">Necesita trabajar más inteligente.</span>
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
  { from: "📒  Cuaderno manual",         to: "📊  Dashboard digital en tiempo real" },
  { from: "📋  Excel desordenado",        to: "🖥️  Sistema POS con reportes automáticos" },
  { from: "💬  Mensajes sin responder",   to: "🤖  Automatización de WhatsApp 24/7" },
  { from: "😟  Ventas perdidas",          to: "✅  Clientes atendidos y organizados" },
  { from: "❓  Sin control de stock",     to: "📦  Inventario actualizado al segundo" },
];

function TransformSection() {
  return (
    <section id="transform" className="relative z-10 py-24 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(2,3,16,0.95) 20%, rgba(2,3,16,0.98) 60%, rgba(2,3,16,0.95) 80%, transparent 100%)" }} />

      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <span className="eyebrow mb-5 block w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            La transformación
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-black text-white leading-none tracking-tight mb-10"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            De <span className="text-red-400">caos</span> a{" "}
            <span className="text-gradient">sistema</span>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {transforms.map((t, i) => (
            <Reveal key={i} delay={0.1 + i * 0.07}>
              <div className="grid items-center gap-3" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
                <div className="rounded-xl px-4 py-3 text-center"
                  style={{ background: "rgba(10,12,30,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-xs text-slate-400">{t.from}</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)", boxShadow: "0 0 14px rgba(56,189,248,0.4)" }}>
                  <ArrowRight size={13} className="text-white" />
                </div>
                <div className="rounded-xl px-4 py-3 text-center"
                  style={{ background: "linear-gradient(135deg,rgba(56,189,248,0.1),rgba(167,139,250,0.1))", border: "1px solid rgba(56,189,248,0.2)" }}>
                  <span className="text-xs text-white font-medium">{t.to}</span>
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
  { icon: ShoppingCart, color: "#38BDF8", title: "Sistema POS con Inventario",     desc: "Vende, controla stock y genera reportes desde cualquier dispositivo." },
  { icon: Globe,        color: "#A78BFA", title: "Página Web Moderna",             desc: "Tu negocio en internet con diseño premium que convierte visitas en ventas." },
  { icon: MessageCircle,color: "#22D3EE", title: "Automatización de WhatsApp 24/7",desc: "Responde clientes, cierra ventas y envía info de forma automática todo el día." },
  { icon: Users,        color: "#34D399", title: "CRM para Clientes",              desc: "Gestiona contactos, historial de compras y seguimiento de prospectos." },
  { icon: FileText,     color: "#FB923C", title: "Facturación Electrónica",        desc: "Emite facturas legales, controla cobros y lleva tus cuentas en orden." },
  { icon: Code2,        color: "#818CF8", title: "Sistemas Personalizados",        desc: "Si no existe, lo construimos. Tu proceso de negocio, digitalizado." },
];

function SolutionsSection() {
  return (
    <section id="solutions" className="relative z-10 py-24 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,8,0.92)" }} />

      <div className="relative max-w-5xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="eyebrow mb-5 inline-block">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Nuestras soluciones
          </span>
          <h2 className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            Todo lo que tu negocio{" "}
            <span className="text-gradient">necesita</span>
          </h2>
          <p className="text-slate-500 text-base mt-4 max-w-xl mx-auto">
            Desde el primer sistema hasta la automatización completa. Lo construimos todo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ duration: 0.2 }}
                className="rounded-2xl p-6 h-full relative overflow-hidden cursor-default group"
                style={{ background: "rgba(8,12,38,0.95)", border: `1px solid ${s.color}20`, backdropFilter: "blur(16px)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}12 0%, transparent 60%)` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 relative"
                  style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, boxShadow: `0 0 18px ${s.color}18` }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5 leading-snug">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SECTION 5 — ASSESSMENT
══════════════════════════════════════ */
const WA = "18293430288";
const svcOpts = [
  { k: "pos",  l: "Sistema POS" }, { k: "web",  l: "Página Web" },
  { k: "wa",   l: "WhatsApp 24/7" }, { k: "crm", l: "CRM" },
  { k: "fact", l: "Facturación" }, { k: "sys",  l: "Sistema personalizado" },
];
const budgetOpts = [
  { k: "a", l: "RD$10,000 – RD$25,000" }, { k: "b", l: "RD$25,000 – RD$50,000" },
  { k: "c", l: "RD$50,000 – RD$100,000" }, { k: "d", l: "Más de RD$100,000" },
];

function AssessmentSection() {
  const [svcs, setSvcs] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [biz, setBiz] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const selSvcs = svcOpts.filter(s => svcs.includes(s.k)).map(s => `• ${s.l}`).join("\n");
    const selBudget = budgetOpts.find(b => b.k === budget)?.l ?? "No especificado";
    const msg = encodeURIComponent(
      `🚀 *Evaluación MONTECH*\n\n👤 *Nombre:* ${name}\n📱 *WhatsApp:* ${phone}\n🏪 *Negocio:* ${biz}\n\n💡 *Soluciones:*\n${selSvcs || "• No especificado"}\n\n💰 *Presupuesto:* ${selBudget}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
  }

  const inp = "w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-all"
    + " focus:ring-1 focus:ring-brand-blue/40"
    + " " + "bg-white/[0.04] border border-white/10 focus:border-brand-blue/40";

  return (
    <section id="assessment" className="relative z-10 py-24 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,8,0.95)" }} />

      <div className="relative max-w-2xl mx-auto">
        <Reveal className="text-center mb-10">
          <span className="eyebrow mb-5 inline-block">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Evaluación gratis
          </span>
          <h2 className="font-black text-white leading-none tracking-tight mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            ¿Qué necesita <span className="text-gradient">tu negocio?</span>
          </h2>
          <p className="text-slate-500 text-sm">Cuéntanos y te enviamos una propuesta personalizada en 24h.</p>
        </Reveal>

        <Reveal delay={0.2}>
          <form onSubmit={submit}
            className="rounded-3xl p-7 md:p-9 space-y-6"
            style={{ background: "rgba(8,12,38,0.98)", border: "1px solid rgba(56,189,248,0.12)", backdropFilter: "blur(20px)" }}>

            <div>
              <p className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-widest">¿Qué solución necesitas?</p>
              <div className="flex flex-wrap gap-2">
                {svcOpts.map(s => {
                  const on = svcs.includes(s.k);
                  return (
                    <button key={s.k} type="button" onClick={() => setSvcs(p => p.includes(s.k) ? p.filter(x => x !== s.k) : [...p, s.k])}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: on ? "linear-gradient(135deg,rgba(56,189,248,0.2),rgba(167,139,250,0.2))" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${on ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.08)"}`,
                        color: on ? "#F1F5F9" : "#94A3B8",
                      }}>
                      {on && <CheckCircle2 size={12} />}{s.l}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-widest">Presupuesto estimado</p>
              <div className="grid grid-cols-2 gap-2">
                {budgetOpts.map(b => {
                  const on = budget === b.k;
                  return (
                    <button key={b.k} type="button" onClick={() => setBudget(b.k)}
                      className="px-4 py-2.5 rounded-xl text-xs font-medium text-left transition-all"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Tu nombre *</p>
                <input className={inp} placeholder="Juan Pérez" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">WhatsApp *</p>
                <input className={inp} placeholder="829-343-0288" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Nombre del negocio *</p>
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
   SECTION 6 — FINAL
══════════════════════════════════════ */
function FinalSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(56,189,248,0.09) 0%, rgba(167,139,250,0.06) 40%, rgba(0,0,8,0.97) 70%)" }} />

      <div className="relative">
        <Reveal>
          <p className="text-slate-600 text-xs tracking-[0.35em] uppercase mb-6">Build systems that help businesses grow.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-white font-black leading-none tracking-tighter select-none"
            style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)", textShadow: "0 0 80px rgba(56,189,248,0.15)" }}>
            MODERNIZE<br />
            <span className="text-gradient" style={{ fontSize: "0.85em" }}>YOUR</span><br />
            BUSINESS
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="font-black tracking-[0.2em] my-6"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", background: "linear-gradient(90deg,#38BDF8,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            MONTECH
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a href="#assessment" whileHover={{ scale: 1.04 }} className="btn-primary text-base px-10 py-4">
              Solicitar evaluación ahora <ArrowRight size={17} />
            </motion.a>
            <motion.a href="#solutions" whileHover={{ scale: 1.04 }} className="btn-ghost text-base px-10 py-4">
              Ver soluciones
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-slate-700 text-xs tracking-widest">✦ Evaluación gratis · Sin contrato · Propuesta en 24h ✦</p>
        </Reveal>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/[0.04] px-8 py-5
                      flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-black">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#38BDF8,#8B5CF6)" }}>
            <Zap size={12} className="text-white" />
          </div>
          MON<span className="text-gradient">TECH</span>
        </span>
        <p className="text-xs text-slate-700">© {new Date().getFullYear()} MONTECH · República Dominicana</p>
        <div className="flex gap-5 text-xs text-slate-600">
          {["Soluciones","Evaluación"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-slate-300 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function Home() {
  useScrollTracker();
  return (
    <SmoothScroll>
      <Cursor />

      {/* 3D WebGL scene — fixed, behind everything */}
      <WebGLScene />

      {/* Cinematic scan-lines */}
      <div className="scanlines pointer-events-none" />

      {/* All scrollable content */}
      <main>
        <Navbar />
        <HeroSection />
        <ChaosSection />
        <TransformSection />
        <SolutionsSection />
        <AssessmentSection />
        <FinalSection />
      </main>
    </SmoothScroll>
  );
}
