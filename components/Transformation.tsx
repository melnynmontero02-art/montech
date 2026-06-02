"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const transformations = [
  { before: "📒 Cuaderno manual", after: "📊 Dashboard digital" },
  { before: "📋 Excel desordenado", after: "🖥️ Sistema POS" },
  { before: "💬 Mensajes sin responder", after: "🤖 Automatización 24/7" },
  { before: "😟 Ventas perdidas", after: "✅ Clientes organizados" },
  { before: "❓ Inventario sin control", after: "📦 Stock en tiempo real" },
  { before: "👎 Web inexistente", after: "🌐 Página web moderna" },
];

function TransformRow({
  before,
  after,
  index,
}: {
  before: string;
  after: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3"
    >
      {/* Before */}
      <div className="flex-1 glass-card rounded-xl px-4 py-3 text-center">
        <span className="text-sm md:text-base text-slate-400">{before}</span>
      </div>

      {/* Arrow */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.07 + 0.2 }}
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #38BDF8, #A78BFA)",
          boxShadow: "0 0 16px rgba(56,189,248,0.4)",
        }}
      >
        <ArrowRight size={14} className="text-white" />
      </motion.div>

      {/* After */}
      <div
        className="flex-1 rounded-xl px-4 py-3 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(167,139,250,0.08))",
          border: "1px solid rgba(56,189,248,0.2)",
        }}
      >
        <span className="text-sm md:text-base text-white font-semibold">{after}</span>
      </div>
    </motion.div>
  );
}

export default function Transformation() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#020310" }}>
      {/* Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            La transformación
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            De <span className="text-red-400">caos</span> a{" "}
            <span className="text-gradient">sistema</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-md mx-auto">
            Así es como MONTECH convierte tu negocio de hoy en la empresa moderna que quieres tener.
          </p>
        </motion.div>

        {/* Transformations */}
        <div className="space-y-3">
          {transformations.map((t, i) => (
            <TransformRow key={i} {...t} index={i} />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          Todo esto, diseñado a medida para tu negocio específico.
        </motion.p>
      </div>
    </section>
  );
}
