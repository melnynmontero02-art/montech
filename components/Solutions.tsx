"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShoppingCart, Globe, MessageCircle, Users, Calendar,
  FileText, DollarSign, Store, Code2,
} from "lucide-react";

const solutions = [
  {
    icon: ShoppingCart,
    color: "#38BDF8",
    title: "Sistema POS con inventario",
    desc: "Vende, controla stock y genera reportes desde cualquier dispositivo.",
  },
  {
    icon: Globe,
    color: "#A78BFA",
    title: "Página web moderna",
    desc: "Tu negocio en internet con diseño premium que convierte visitas en clientes.",
  },
  {
    icon: MessageCircle,
    color: "#22D3EE",
    title: "Automatización de WhatsApp 24/7",
    desc: "Responde clientes, cierra ventas y envía información de forma automática, todo el día.",
  },
  {
    icon: Users,
    color: "#34D399",
    title: "CRM para clientes",
    desc: "Gestiona tus contactos, historial de compras y seguimiento de prospectos.",
  },
  {
    icon: Calendar,
    color: "#F472B6",
    title: "Sistema de citas / reservas",
    desc: "Agenda digital para que tus clientes reserven sin llamarte.",
  },
  {
    icon: FileText,
    color: "#FB923C",
    title: "Facturación electrónica",
    desc: "Emite facturas legales, controla cobros y lleva tus cuentas en orden.",
  },
  {
    icon: DollarSign,
    color: "#FBBF24",
    title: "Nómina y RRHH",
    desc: "Gestiona empleados, salarios y descuentos de forma automática.",
  },
  {
    icon: Store,
    color: "#F87171",
    title: "Tienda online",
    desc: "Vende tus productos 24/7 con carrito, pagos y gestión de pedidos.",
  },
  {
    icon: Code2,
    color: "#818CF8",
    title: "Sistemas personalizados",
    desc: "Si no existe, lo construimos. Cualquier proceso de tu negocio, digitalizado.",
  },
];

function SolutionCard({
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group h-full glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300 hover:border-opacity-100 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderColor: `${color}25`,
          boxShadow: `0 0 0 1px ${color}15`,
        }}
      >
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}12 0%, transparent 60%)`,
          }}
        />

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative"
          style={{
            background: `${color}12`,
            border: `1px solid ${color}25`,
            boxShadow: `0 0 20px ${color}20`,
          }}
        >
          <Icon size={22} style={{ color }} />
        </div>

        <div className="relative">
          <h3 className="text-base font-bold text-white mb-1.5 leading-snug">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>

        <div
          className="mt-auto flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color }}
        >
          Conocer más →
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Solutions() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="soluciones" className="relative py-24 bg-[#000008] overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50 pointer-events-none" />

      {/* Orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="section-eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Nuestras soluciones
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Todo lo que tu negocio{" "}
            <span className="text-gradient">necesita</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Desde el primer sistema hasta la automatización completa. Lo construimos todo.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <SolutionCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
