import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OracleRequest, OracleResponse } from "../types";
import { Sparkles, Eye, Shield, Cpu, Compass, BookOpen, Send, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";

export default function OracleSection() {
  const [formData, setFormData] = useState<OracleRequest>({
    businessName: "",
    industry: "",
    currentStatus: "Operamos con altísima calidad pero nuestra web luce amateur o desactualizada.",
    biggestGap: "Los clientes dudan cuando escuchan nuestras tarifas premium y piden rebajas.",
    targetAspiration: "Queremos ser el referente absoluto de ultra-lujo y cerrar negocios de seis cifras."
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OracleResponse | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingEmail, setBookingEmail] = useState("");

  const statusOptions = [
    "Operamos con altísima calidad pero nuestra web luce amateur o desactualizada.",
    "Somos líderes técnicos de nicho pero ignorados estéticamente.",
    "Competimos agresivamente por precio debido a un ecosistema sin autoridad."
  ];

  const gapOptions = [
    "Los clientes dudan cuando escuchan nuestras tarifas premium y piden rebajas.",
    "El tráfico que llega no tiene el nivel adquisitivo ni la sofisticación necesaria.",
    "Nuestra web actual nos avergüenza ante socios, competidores y directivos."
  ];

  const aspirationOptions = [
    "Queremos ser el referente absoluto de ultra-lujo y cerrar negocios de seis cifras.",
    "Subir nuestras tarifas un 200% sustentado únicamente en credibilidad estética.",
    "Establecer un monopolio de percepción donde no quepa comparación alguna."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.industry) {
      setError("Por favor, introduzca el nombre de su negocio y su industria.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/oracle/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("El Oráculo está meditando y no pudo conectarse. Por favor, intente de nuevo.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al procesar el diagnóstico de percepción.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEmail) return;
    setBookingSuccess(true);
  };

  const resetAll = () => {
    setResult(null);
    setFormData({
      businessName: "",
      industry: "",
      currentStatus: statusOptions[0],
      biggestGap: gapOptions[0],
      targetAspiration: aspirationOptions[0]
    });
    setBookingSuccess(false);
    setBookingEmail("");
  };

  return (
    <section id="oracle-section" className="relative py-28 md:py-40 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans">
      
      {/* Background aesthetics representational of a mystical temple */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Container header */}
        <div className="text-center mb-16 select-none">
          <p className="text-[10px] font-mono tracking-[0.4em] text-gold uppercase font-bold mb-3">El Oráculo</p>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-none text-neutral-100 mb-4">
            Consulte a <span className="text-gold italic">El Oráculo.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed font-sans">
            "Cuéntanos qué está pasando con tu presencia digital.<br />
            Te respondemos con claridad, sin ruido ni presión."
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div
              key="oracle-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-[#0B0B0C] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 text-[9px] font-mono text-gold/35 tracking-widest uppercase">
                STATUS: DISPONIBLE
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Text input grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-widest text-gold/80 font-bold" htmlFor="business-name">
                      Nombre de la Empresa *
                    </label>
                    <input
                      id="business-name"
                      type="text"
                      className="w-full bg-[#070708] border border-white/10 rounded px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold/40 transition-colors"
                      placeholder="e.g. Athena Solutions"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-widest text-gold/80 font-bold" htmlFor="industry-niche">
                      Sectores / Industria *
                    </label>
                    <input
                      id="industry-niche"
                      type="text"
                      className="w-full bg-[#070708] border border-white/10 rounded px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold/40 transition-colors"
                      placeholder="e.g. Consultoría Premium, Finanzas"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Dropdown status options */}
                <div className="space-y-3 font-sans">
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                    1. Estado Actual de su Percepción Digital
                  </label>
                  <div className="space-y-2">
                    {statusOptions.map((opt, i) => (
                      <label 
                        key={i} 
                        className={`flex items-start gap-3 p-3.5 rounded border text-xs cursor-pointer transition-colors ${
                          formData.currentStatus === opt 
                            ? "bg-gold/5 border-gold/30 text-neutral-200" 
                            : "bg-[#070708] border-white/10 text-neutral-400 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="statusOption"
                          className="mt-0.5 accent-gold"
                          checked={formData.currentStatus === opt}
                          onChange={() => setFormData({ ...formData, currentStatus: opt })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dropdown gaps options */}
                <div className="space-y-3 font-sans">
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                    2. ¿Cuál es su brecha de valor más dolorosa?
                  </label>
                  <div className="space-y-2">
                    {gapOptions.map((opt, i) => (
                      <label 
                        key={i} 
                        className={`flex items-start gap-3 p-3.5 rounded border text-xs cursor-pointer transition-colors ${
                          formData.biggestGap === opt 
                            ? "bg-gold/5 border-gold/30 text-neutral-200" 
                            : "bg-[#070708] border-white/10 text-neutral-400 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="gapOption"
                          className="mt-0.5 accent-gold"
                          checked={formData.biggestGap === opt}
                          onChange={() => setFormData({ ...formData, biggestGap: opt })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dropdown aspirations options */}
                <div className="space-y-3 font-sans">
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                    3. Su Aspiración de Estatus Suprema
                  </label>
                  <div className="space-y-2">
                    {aspirationOptions.map((opt, i) => (
                      <label 
                        key={i} 
                        className={`flex items-start gap-3 p-3.5 rounded border text-xs cursor-pointer transition-colors ${
                          formData.targetAspiration === opt 
                            ? "bg-gold/5 border-gold/30 text-neutral-200" 
                            : "bg-[#070708] border-white/10 text-neutral-400 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="aspirationOption"
                          className="mt-0.5 accent-gold"
                          checked={formData.targetAspiration === opt}
                          onChange={() => setFormData({ ...formData, targetAspiration: opt })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4 flex items-center gap-3 text-xs text-red-400 font-sans">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* SUBMIT */}
                <div className="pt-4 flex justify-center">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    id="oracle-submit"
                    className="bg-gradient-to-r from-gold to-[#A07B37] hover:from-[#E5C383] hover:to-[#A07B37] text-[#050505] font-mono text-xs uppercase tracking-[0.25em] font-bold px-10 py-4 rounded cursor-pointer transition-all flex items-center gap-3 shadow-lg"
                  >
                    <span>Consultar el Oráculo</span>
                    <Send className="w-4 h-4 shrink-0" />
                  </motion.button>
                </div>

              </form>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              key="oracle-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0B0B0C] border border-white/10 rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[500px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-14 h-14 border border-t-gold border-white/10 rounded-full mb-8 flex items-center justify-center text-gold"
              >
                <Compass className="w-6 h-6" />
              </motion.div>

              <p className="text-[10px] font-mono tracking-[0.4em] text-gold uppercase font-bold animate-pulse mb-3">
                Calculando el Índice de Percepción de KLEOS
              </p>
              <h3 className="text-2xl font-serif text-neutral-200 italic max-w-lg leading-relaxed">
                "Detectando discrepancias de posicionamiento, analizando su ecosistema digital..."
              </h3>

              <div className="w-48 h-[1px] bg-white/10 mt-10 overflow-hidden relative">
                <motion.div
                  animate={{ left: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
                />
              </div>
            </motion.div>
          )}

          {/* DECREE RESULT */}
          {result && (
            <motion.div
              key="oracle-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0B0B0C] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative"
            >
              {/* Decree visual frame */}
              <div className="absolute inset-x-8 top-8 bottom-8 border border-gold/15 rounded-xl pointer-events-none" />

              <div className="relative z-10 space-y-10 py-4">
                
                {/* Decree Header */}
                <div className="text-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold block mb-2">
                    REVELACIÓN OFICIAL DEL ORÁCULO DE KLEOS
                  </span>
                  <p className="text-xs text-neutral-500 font-mono">
                    {formData.businessName.toUpperCase()} · DIAGNÓSTICO DE ESTATUS M-2026
                  </p>
                  <div className="w-12 h-px bg-gold/35 mx-auto mt-6" />
                </div>

                {/* Gauge Metric Structure */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  
                  {/* Circle Metric */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-neutral-900 fill-none"
                        strokeWidth="5"
                      />
                      <motion.circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-gold fill-none"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 60}
                        initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - result.authorityScore / 100) }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-mono font-black text-white">
                        {result.authorityScore}
                      </span>
                      <span className="text-[8px] font-mono text-gold tracking-widest uppercase">
                        ÍNDICE KLEOS
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis title & summary */}
                  <div className="text-center md:text-left space-y-3 max-w-md font-sans">
                    <span className="text-[10px] font-mono tracking-widest bg-gold/10 text-gold px-2.5 py-1 rounded">
                      DIAGNÓSTICO FORMAL
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif tracking-tight text-neutral-100">
                      {result.diagnosisTitle}
                    </h3>
                    <p className="text-neutral-300 text-sm font-light leading-relaxed">
                      {result.narrativeIntroduction}
                    </p>
                  </div>
                </div>

                {/* 3 Revealed Gaps list */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-sans">
                  {result.coreGaps.map((gap, i) => (
                    <div key={i} className="bg-[#070708] border border-white/10 rounded h-full p-5 space-y-2">
                      <div className="font-mono text-xs text-gold tracking-widest font-bold">
                        BRECHA 0{i + 1}
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {gap}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Strategy Path */}
                <div className="bg-gold/5 border border-gold/15 rounded-lg p-6 space-y-3 font-sans">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-gold" />
                    <span className="font-mono text-[10px] tracking-widest text-gold uppercase font-bold">
                      LA ESTRATEGIA DE AUTORIDAD RECOMENDADA
                    </span>
                  </div>
                  <p className="text-neutral-200 text-sm font-light leading-relaxed">
                    {result.transformationStrategy}
                  </p>
                </div>

                {/* Slogan Concept */}
                <div className="text-center py-6 border-y border-white/10">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Concepto de Posicionamiento Propuesto:</p>
                  <p className="text-2xl md:text-3xl font-serif text-gold italic font-light tracking-wide">
                    “{result.proposedConcept}”
                  </p>
                </div>

                {/* Action CTA & Resubmit */}
                <div className="space-y-6 text-center pt-4">
                  {!bookingSuccess ? (
                    <div className="max-w-md mx-auto space-y-4 font-sans">
                      <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                        Este diagnóstico estratégico es apenas el inicio. Agende una llamada de evaluación privada para corregir su discrepancia de posicionamiento de forma personalizada.
                      </p>
                      
                      <form onSubmit={handleBooking} className="flex flex-col sm:flex-row gap-2 mt-4">
                        <input
                          type="email"
                          className="w-full bg-[#070708] border border-white/10 rounded px-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold/40"
                          placeholder="Tu correo corporativo"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          required
                        />
                        <button
                          type="submit"
                          id="oracle-book"
                          className="bg-gold hover:bg-[#E5C383] text-black font-mono text-[10px] uppercase tracking-widest font-bold px-6 py-3 rounded shrink-0 cursor-pointer transition-colors"
                        >
                          INICIAR PROYECTO
                        </button>
                      </form>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="bg-[#070708] border border-white/10 rounded-lg p-6 max-w-md mx-auto flex items-center gap-4 text-left font-sans"
                    >
                      <CheckCircle className="w-8 h-8 text-gold shrink-0" />
                      <div>
                        <p className="text-xs font-mono tracking-widest text-gold uppercase font-bold">SOLICITUD REGISTRADA</p>
                        <p className="text-xs text-neutral-300 font-light mt-1">
                          Nuestra dirección ejecutiva evaluará su ecosistema y se pondrá en contacto en un plazo estricto de 48 horas herméticas.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={resetAll}
                      id="oracle-reset"
                      className="text-xs font-mono text-neutral-500 hover:text-white flex items-center gap-2 mx-auto cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Consultar Nuevamente</span>
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
