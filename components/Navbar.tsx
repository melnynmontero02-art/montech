"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#evaluacion" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark border-b border-brand-blue/10 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center glow-sm-blue">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">
            MON<span className="text-gradient">TECH</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#evaluacion"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-sm"
        >
          <Zap size={14} /> Evaluar mi negocio
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-dark border-t border-brand-blue/10 px-6 pb-6 pt-4 space-y-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-slate-300 hover:text-white font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#evaluacion"
              onClick={() => setOpen(false)}
              className="btn-primary w-full text-center mt-2"
            >
              Evaluar mi negocio
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
