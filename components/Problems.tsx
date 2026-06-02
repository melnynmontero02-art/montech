"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, BarChart2, AlertTriangle, UserX, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    color: "#F87171",
    title: "Pierdes tiempo respondiendo mensajes",
    desc: "Horas respondiendo WhatsApp manualmente que podrías usar para hacer crecer tu negocio.",
  },
  {
    icon: BarChart2,
    color: "#FB923C",
    title: "Sin control del inventario",
    desc: "No sabes qué tienes en stock, se te va el producto sin registrar y pierdes dinero.",
  },
  {
    icon: AlertTriangle,
    color: "#FBBF24",
    title: "Todo lo haces manual",
    desc: "Excel, cuaderno, WhatsApp... un caos que no escala y te llena de errores.",
  },
  {
    icon: UserX,
    color: "#F87171",
    title: "Los clientes se van sin atención",
    desc: "Nadie responde fuera de horario y pierdes ventas que podrían ser automáticas.",
  },
  {
    icon: TrendingDown,
    color: "#EF4444",
    title: "Tu negocio no se ve profesional",
    desc: "Sin web, sin sistema, sin imagen. Los clientes eligen a la competencia que sí se ve seria.",
  },
];

function ProblemCard({
  icon: Icon,
  color,
  title,
  desc,
  index,
}: {
  icon: React.ElementType;
  color: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="flex items-start gap-4 p-5 rounded-2xl glass-card hover:border-red-500/20 transition-all duration-300 group"
      style={{ borderColor: `${color}15` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <h3 className="text-base font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function Problems() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const closingRef = useRef(null);
  const closingInView = useInView(closingRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 bg-[#000008] overflow-hidden">
      {/* Red tinted gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(239,68,68,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="section-eyebrow" style={{ color: "#F87171", borderColor: "rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            El problema
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            ¿Te suena <span className="text-gradient">familiar?</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            Estos son los problemas que frenan a miles de negocios en la República Dominicana.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="space-y-4 mb-16">
          {problems.map((p, i) => (
            <ProblemCard key={i} {...p} index={i} />
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          ref={closingRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={closingInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
          style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.05), rgba(167,139,250,0.05))" }}
        >
          <h3 className="text-2xl md:text-3xl font-black leading-tight mb-4">
            Tu negocio no necesita{" "}
            <span className="text-gradient">trabajar más duro.</span>
            <br />
            Necesita trabajar más <span className="text-gradient-violet">inteligente.</span>
          </h3>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            MONTECH convierte el desorden en un sistema que trabaja por ti, las 24 horas, los 7 días.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
