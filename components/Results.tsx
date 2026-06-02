"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Eye, Star } from "lucide-react";

const metrics = [
  { icon: TrendingUp, color: "#38BDF8", value: 98,  suffix: "%", label: "Más organización", desc: "Tus procesos bajo control" },
  { icon: Zap,        color: "#A78BFA", value: 3,   suffix: "×", label: "Más velocidad", desc: "Tareas hechas en segundos" },
  { icon: ShieldCheck,color: "#22D3EE", value: 100, suffix: "%", label: "Control total", desc: "De ventas, stock y clientes" },
  { icon: Eye,        color: "#34D399", value: 24,  suffix: "/7", label: "Disponibilidad", desc: "WhatsApp automático activo" },
  { icon: Star,       color: "#FBBF24", value: 99,  suffix: "%", label: "Imagen profesional", desc: "Tu negocio se ve serio" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Results() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="resultados" className="relative py-24 bg-[#000008] overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />

      {/* Center orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="section-eyebrow mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Resultados reales
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Lo que <span className="text-gradient">MONTECH</span> entrega
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Negocios que usaban cuadernos, hoy tienen sistemas modernos que trabajan solos.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 group hover:scale-105 transition-transform duration-300"
              style={{ borderColor: `${m.color}20`, boxShadow: `0 0 30px ${m.color}08` }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: `${m.color}12`, border: `1px solid ${m.color}25` }}
              >
                <m.icon size={20} style={{ color: m.color }} />
              </div>
              <div>
                <Counter target={m.value} suffix={m.suffix} />
                <p className="text-xs font-bold text-white mt-1">{m.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
