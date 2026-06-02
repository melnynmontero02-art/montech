"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Send } from "lucide-react";

const WHATSAPP_NUMBER = "18293430288";

/* ── Step definitions ── */
type Step =
  | { type: "text"; key: string; question: string; placeholder: string; inputType?: string }
  | { type: "multi"; key: string; question: string; options: string[] }
  | { type: "single"; key: string; question: string; options: string[] };

const STEPS: Step[] = [
  {
    type: "text",
    key: "biz",
    question: "¿Cuál es el nombre de tu negocio?",
    placeholder: "Ej. Tienda La Esperanza",
  },
  {
    type: "text",
    key: "name",
    question: "¿Cuál es tu nombre?",
    placeholder: "Ej. Juan Pérez",
  },
  {
    type: "text",
    key: "wa",
    question: "¿Cuál es tu número de WhatsApp?",
    placeholder: "Ej. 829-343-0288",
    inputType: "tel",
  },
  {
    type: "multi",
    key: "sol",
    question: "¿Qué solución necesitas?",
    options: [
      "Sistema POS con inventario",
      "Página web moderna",
      "Automatización de WhatsApp 24/7",
      "Sistema de citas / reservas",
      "CRM para clientes",
      "Tienda online",
      "Sistema de facturación",
      "Otro",
    ],
  },
  {
    type: "multi",
    key: "prob",
    question: "¿Cuál es el principal problema de tu negocio actualmente?",
    options: [
      "Pierdo tiempo respondiendo mensajes",
      "No tengo control del inventario",
      "Se me pierden clientes",
      "Mi negocio no se ve profesional",
      "Todo lo hago manual",
      "Necesito automatizar procesos",
      "Otro",
    ],
  },
  {
    type: "multi",
    key: "mgmt",
    question: "¿Cómo manejas actualmente tu negocio?",
    options: [
      "Excel",
      "Cuaderno / manual",
      "WhatsApp solamente",
      "Sistema viejo / obsoleto",
      "No tengo sistema",
      "Otro",
    ],
  },
  {
    type: "multi",
    key: "budget",
    question: "¿Qué presupuesto tienes pensado invertir?",
    options: [
      "RD$5,000 – RD$10,000",
      "RD$10,000 – RD$25,000",
      "RD$25,000 – RD$50,000",
      "RD$50,000 – RD$100,000",
      "Más de RD$100,000",
      "Necesito asesoría primero",
    ],
  },
  {
    type: "single",
    key: "urgency",
    question: "¿Qué tan urgente necesitas la solución?",
    options: [
      "Lo antes posible",
      "Este mes",
      "En los próximos 3 meses",
      "Solo estoy cotizando",
    ],
  },
  {
    type: "single",
    key: "inv",
    question: "¿Tu negocio maneja productos o inventario?",
    options: ["Sí", "No", "Muy poco inventario"],
  },
  {
    type: "single",
    key: "scale",
    question: "¿Quieres que el sistema pueda crecer en el futuro?",
    options: ["Sí", "No", "No estoy seguro"],
  },
  {
    type: "single",
    key: "call",
    question: "¿Quieres agendar una llamada para recibir una propuesta personalizada?",
    options: ["Sí, quiero agendar una llamada", "No por ahora"],
  },
];

const KEYS = ["A","B","C","D","E","F","G","H"];

/* ── Slide variants ── */
const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function EvalForm() {
  const [step, setStep] = useState(-1); // -1 = cover
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = STEPS[step];
  const total = STEPS.length;
  const progress = step < 0 ? 0 : Math.round(((step + 1) / total) * 100);

  /* ── Helpers ── */
  function goNext() {
    setDir(1);
    if (step >= total - 1) { submit(); return; }
    setStep((s) => s + 1);
  }
  function goBack() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  function setTextAnswer(val: string) {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.key]: val }));
  }

  function toggleMulti(opt: string) {
    if (!current) return;
    const prev = (answers[current.key] as string[]) ?? [];
    setAnswers((a) => ({
      ...a,
      [current.key]: prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    }));
  }

  function pickSingle(opt: string) {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.key]: opt }));
    setTimeout(() => goNext(), 250);
  }

  function canContinue(): boolean {
    if (!current) return false;
    if (current.type === "text") return !!(answers[current.key] as string)?.trim();
    if (current.type === "multi") return ((answers[current.key] as string[]) ?? []).length > 0;
    return false;
  }

  function submit() {
    const get = (k: string) => {
      const v = answers[k];
      if (Array.isArray(v)) return v.map((x) =>
        x === "Otro" && otherText[k] ? `  • Otro: ${otherText[k]}` : `  • ${x}`
      ).join("\n");
      return v ?? "No especificado";
    };
    const budget = (answers.budget as string[] | undefined)?.join(", ") ?? "No especificado";
    const msg = encodeURIComponent(
      `🚀 *Evaluación MONTECH*\n\n` +
      `🏪 *Negocio:* ${answers.biz ?? ""}\n` +
      `👤 *Nombre:* ${answers.name ?? ""}\n` +
      `📱 *WhatsApp:* ${answers.wa ?? ""}\n\n` +
      `💡 *Soluciones de interés:*\n${get("sol")}\n\n` +
      `⚠️ *Problema principal:*\n${get("prob")}\n\n` +
      `🖥️ *Cómo maneja el negocio:*\n${get("mgmt")}\n\n` +
      `💰 *Presupuesto:* ${budget}\n` +
      `⏱️ *Urgencia:* ${answers.urgency ?? ""}\n` +
      `📦 *Inventario:* ${answers.inv ?? ""}\n` +
      `📈 *Sistema escalable:* ${answers.scale ?? ""}\n` +
      `📞 *Agendar llamada:* ${answers.call ?? ""}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setDone(true);
  }

  /* ── Render ── */
  return (
    <section id="evaluacion" className="relative py-24 overflow-hidden" style={{ background: "#020310" }}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[700px] h-[500px]"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px]"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 65%)", filter: "blur(40px)" }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-eyebrow mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Evaluación gratis
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-3">
            ¿Qué necesita{" "}
            <span className="text-gradient">tu negocio?</span>
          </h2>
          <p className="text-slate-500 text-base">
            Cuéntanos en 2 minutos y te enviamos una propuesta por WhatsApp.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl overflow-hidden" style={{ minHeight: 420 }}>
          {/* Progress bar */}
          {step >= 0 && !done && (
            <div className="h-1 bg-white/5 w-full">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, #38BDF8, #A78BFA)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}

          <div className="p-7 md:p-10">
            <AnimatePresence mode="wait" custom={dir}>
              {/* ── COVER ── */}
              {step === -1 && !done && (
                <motion.div
                  key="cover"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-6 py-6"
                >
                  <div className="text-5xl">🚀</div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Evaluación rápida</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Responde 11 preguntas cortas para que podamos entender qué necesita tu negocio y enviarte una propuesta personalizada.
                    </p>
                  </div>
                  <button className="btn-primary" onClick={goNext}>
                    Comenzar <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* ── DONE ── */}
              {done && (
                <motion.div
                  key="done"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-6 py-6"
                >
                  <div className="text-5xl">🎉</div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">¡Gracias por completar la evaluación!</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Se abrió WhatsApp con toda tu información. Si no se abrió, escríbenos directamente al{" "}
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-brand-blue underline">
                        +1 (829) 343-0288
                      </a>
                    </p>
                  </div>
                  <button
                    className="btn-secondary text-sm"
                    onClick={() => { setStep(-1); setDone(false); setAnswers({}); }}
                  >
                    Hacer otra evaluación
                  </button>
                </motion.div>
              )}

              {/* ── STEPS ── */}
              {step >= 0 && !done && current && (
                <motion.div
                  key={step}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step label */}
                  <p className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-3">
                    Pregunta {step + 1} de {total}
                  </p>

                  {/* Question */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-1">
                    {current.question}
                  </h3>

                  {current.type === "multi" && (
                    <p className="text-xs text-slate-500 mb-5">Puedes seleccionar varias opciones</p>
                  )}
                  {current.type !== "multi" && <div className="mb-5" />}

                  {/* TEXT input */}
                  {current.type === "text" && (
                    <input
                      autoFocus
                      type={current.inputType ?? "text"}
                      value={(answers[current.key] as string) ?? ""}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && canContinue()) goNext(); }}
                      placeholder={current.placeholder}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 text-base outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20 transition-all mb-6"
                    />
                  )}

                  {/* MULTI-SELECT options */}
                  {current.type === "multi" && (
                    <div className="flex flex-col gap-2 mb-6">
                      {current.options.map((opt, i) => {
                        const sel = ((answers[current.key] as string[]) ?? []).includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleMulti(opt)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200"
                            style={{
                              background: sel
                                ? "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(167,139,250,0.15))"
                                : "rgba(255,255,255,0.03)",
                              border: `1px solid ${sel ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.07)"}`,
                              color: sel ? "#F1F5F9" : "#94A3B8",
                              boxShadow: sel ? "0 0 16px rgba(56,189,248,0.12)" : "none",
                            }}
                          >
                            <span
                              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                              style={{
                                background: sel ? "#38BDF8" : "rgba(255,255,255,0.06)",
                                color: sel ? "#fff" : "#64748B",
                                border: sel ? "none" : "1px solid rgba(255,255,255,0.1)",
                              }}
                            >
                              {sel ? <CheckCircle2 size={13} /> : KEYS[i]}
                            </span>
                            {opt}
                          </button>
                        );
                      })}

                      {/* Text input shown when "Otro" is selected */}
                      {((answers[current.key] as string[]) ?? []).includes("Otro") && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          transition={{ duration: 0.25 }}
                        >
                          <input
                            autoFocus
                            type="text"
                            placeholder="Describe tu situación con más detalle..."
                            value={otherText[current.key] ?? ""}
                            onChange={(e) =>
                              setOtherText((prev) => ({ ...prev, [current.key]: e.target.value }))
                            }
                            className="w-full mt-1 bg-white/[0.06] border border-brand-blue/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-brand-blue/70 focus:ring-1 focus:ring-brand-blue/20 transition-all"
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* SINGLE-SELECT options */}
                  {current.type === "single" && (
                    <div className="flex flex-col gap-2 mb-6">
                      {current.options.map((opt, i) => {
                        const sel = answers[current.key] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => pickSingle(opt)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200"
                            style={{
                              background: sel
                                ? "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(167,139,250,0.18))"
                                : "rgba(255,255,255,0.03)",
                              border: `1px solid ${sel ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.07)"}`,
                              color: sel ? "#F1F5F9" : "#94A3B8",
                              boxShadow: sel ? "0 0 20px rgba(56,189,248,0.15)" : "none",
                              transform: sel ? "scale(1.01)" : "scale(1)",
                            }}
                          >
                            <span
                              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{
                                background: sel ? "#38BDF8" : "rgba(255,255,255,0.06)",
                                color: sel ? "#fff" : "#64748B",
                                border: sel ? "none" : "1px solid rgba(255,255,255,0.1)",
                              }}
                            >
                              {sel ? <CheckCircle2 size={13} /> : KEYS[i]}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Nav buttons */}
                  <div className="flex items-center gap-3">
                    {/* Continue (text + multi) */}
                    {current.type !== "single" && (
                      <motion.button
                        onClick={goNext}
                        disabled={!canContinue()}
                        whileHover={canContinue() ? { scale: 1.02 } : {}}
                        whileTap={canContinue() ? { scale: 0.97 } : {}}
                        className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                        style={canContinue() ? {} : { background: "rgba(255,255,255,0.08)", boxShadow: "none" }}
                      >
                        {step === total - 1 ? (
                          <><Send size={15} /> Enviar por WhatsApp</>
                        ) : (
                          <>Continuar <ArrowRight size={15} /></>
                        )}
                      </motion.button>
                    )}

                    {/* Back */}
                    {step > 0 && (
                      <button
                        onClick={goBack}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-white transition-colors"
                      >
                        <ArrowLeft size={14} /> Atrás
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
