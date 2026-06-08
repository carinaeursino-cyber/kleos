import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import BearVideo from "./BearVideo";
import LambdaCanvas from "../../LambdaCanvas";
import GoldenSpiral from "./GoldenSpiral";

// ─────────────────────────────────────────────────────────────────
// KLEOS Hero — Experiencia cinematográfica continua
//
// El visitante no percibe 3 slides separados.
// Percibe UNA sola secuencia de entrada, como una intro de película:
//
//   ACT I   — El Oso        (dura hasta que el video termina)
//   ACT II  — La Espiral    (3.5s de respiración y transición)
//   ACT III — El Lambda     (5.5s de dibujo láser e identidad)
//             → entra al sitio automáticamente
//
// Sin dots de navegación. Sin botón "Ingresar" visible al inicio.
// Sin pausas. Sin interrupciones. Solo el ritual.
// ─────────────────────────────────────────────────────────────────

const ACT_DURATIONS = {
  bear:   0,      // dura lo que dura el video (onEnded lo avanza)
  spiral: 3500,   // 3.5s — respiración contemplativa
  lambda: 5800,   // 5.8s — draw láser + identidad + entrada al sitio
};

interface HeroSectionProps {
  onEnterSite?: () => void;
}

export default function HeroSection({ onEnterSite }: HeroSectionProps) {
  const [act, setAct]           = useState<"bear" | "spiral" | "lambda">("bear");
  const [hasEntered, setHasEntered] = useState(false);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Avanzar al siguiente acto ──
  const goToSpiral = useCallback(() => {
    setAct("spiral");
  }, []);

  const goToLambda = useCallback(() => {
    setAct("lambda");
  }, []);

  // ── Al entrar en el Acto II (Espiral), programar el Acto III ──
  useEffect(() => {
    if (act !== "spiral") return;
    timerRef.current = setTimeout(goToLambda, ACT_DURATIONS.spiral);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [act, goToLambda]);

  // ── Al entrar en el Acto III (Lambda), programar la entrada al sitio ──
  useEffect(() => {
    if (act !== "lambda") return;
    timerRef.current = setTimeout(() => {
      handleEnterSite();
    }, ACT_DURATIONS.lambda);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [act]);

  // ── Entrada al sitio — solo se ejecuta una vez ──
  const handleEnterSite = useCallback(() => {
    if (hasEntered) return;
    setHasEntered(true);
    onEnterSite?.();
    setTimeout(() => {
      document
        .getElementById("statement-percepcion")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, [hasEntered, onEnterSite]);

  // ── Click en cualquier parte = saltar la intro y entrar al sitio ──
  const handleSkip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    handleEnterSite();
  }, [handleEnterSite]);

  return (
    <div
      className="relative w-full h-screen bg-[#050505] overflow-hidden cursor-pointer"
      onClick={handleSkip}
    >

      {/* ══════════════════════════════════════════════════════
          ACTO I — EL OSO
          Fundido de entrada. Fundido de salida hacia negro.
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {act === "bear" && (
          <motion.div
            key="bear"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.4, ease: "easeInOut" },
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <BearVideo
              isActive={act === "bear"}
              onEnded={goToLambda}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          ACTO II — LA ESPIRAL DORADA
          Aparece desde el negro. Respira. Funde hacia el Lambda.
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {act === "spiral" && (
          <motion.div
            key="spiral"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <GoldenSpiral isActive={act === "spiral"} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          ACTO III — EL LAMBDA
          Emerge desde el negro. El isotipo se dibuja en láser.
          El "K·L·E·O·S" aparece. Luego funde al sitio.
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {act === "lambda" && (
          <motion.div
            key="lambda"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.6, ease: "easeInOut" },
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          >
            <LambdaCanvas isActive={act === "lambda"} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          HINT DE SKIP — sutil, esquina inferior derecha
          Solo visible después del Acto I para no interrumpir
          la experiencia del oso.
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!hasEntered && act !== "bear" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 sm:bottom-10 right-6 sm:right-8 z-50 pointer-events-none select-none"
          >
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-white/20 uppercase">
              Toca para ingresar
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          LÍNEA GLOW INFERIOR — marca editorial constante
      ══════════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />

    </div>
  );
}
