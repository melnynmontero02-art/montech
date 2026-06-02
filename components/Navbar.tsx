"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { label: "Inicio",     href: "#" },
  { label: "Soluciones", href: "#solutions" },
  { label: "Evaluación", href: "#assessment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark border-b border-white/[0.06] py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#38BDF8,#8B5CF6)", boxShadow: "0 0 18px rgba(56,189,248,0.35)" }}
          >
            <Zap size={15} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">
            MON<span className="text-gradient">TECH</span>
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="text-sm font-medium text-slate-500 hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-blue transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#assessment"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
          style={{ background: "linear-gradient(135deg,rgba(56,189,248,0.15),rgba(139,92,246,0.15))", border: "1px solid rgba(56,189,248,0.25)", color: "#38BDF8" }}>
          <Zap size={13} /> Evaluar mi negocio
        </a>

        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(v => !v)}>
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
            className="md:hidden glass-dark border-t border-white/[0.06] px-6 pb-6 pt-4 space-y-4"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block text-slate-300 hover:text-white font-medium text-sm">{l.label}</a>
            ))}
            <a href="#assessment" onClick={() => setOpen(false)} className="btn-primary w-full text-center text-sm py-3">
              Evaluar mi negocio
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
