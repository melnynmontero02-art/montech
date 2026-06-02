"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 overflow-hidden bg-[#020310]">
      {/* Animated orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.12) 0%, rgba(167,139,250,0.08) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[400px] animate-orb-1 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[350px] h-[350px] animate-orb-2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="section-eyebrow mx-auto w-fit mb-8">
            <Zap size={12} className="text-brand-blue" />
            Empieza hoy
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
            Haz que tu negocio se vea y funcione
            <br />
            <span className="text-gradient">como una empresa moderna</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Solicita tu evaluación y descubre qué sistema necesita tu negocio.
            Sin costo, sin compromiso, con propuesta personalizada.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#evaluacion"
              className="btn-primary text-base px-8 py-4"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Solicitar evaluación ahora <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#soluciones"
              className="btn-secondary text-base px-8 py-4"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver todas las soluciones
            </motion.a>
          </div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 text-sm text-slate-600"
          >
            ✅ Evaluación gratis · Sin contrato · Propuesta en 24h
          </motion.p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative mt-20 border-t border-white/[0.04] pt-8 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center">
            <Zap size={13} className="text-white" />
          </div>
          <span className="text-lg font-black">
            MON<span className="text-gradient">TECH</span>
          </span>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} MONTECH. Modernizamos negocios en República Dominicana.
        </p>
        <div className="flex gap-4 text-xs text-slate-600">
          <a href="#soluciones" className="hover:text-slate-400 transition-colors">Soluciones</a>
          <a href="#evaluacion" className="hover:text-slate-400 transition-colors">Evaluación</a>
          <a href="#resultados" className="hover:text-slate-400 transition-colors">Resultados</a>
        </div>
      </div>
    </section>
  );
}
