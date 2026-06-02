import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import BearVideo from "./BearVideo";
import LambdaCanvas from "../../LambdaCanvas";
import GoldenSpiral from "./GoldenSpiral";

const SLIDE_DURATIONS = [4000, 3000, 6000]; // oso: 4s, transición: 3s, lambda: 6s
const TOTAL_SLIDES = 3;

interface HeroSectionProps {
  onEnterSite?: () => void;
}

export default function HeroSection({ onEnterSite }: HeroSectionProps) {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const currentDuration = SLIDE_DURATIONS[slide];

  const advanceSlide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSlide((prev) => (prev + 1) % TOTAL_SLIDES);
  }, []);

  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isPaused || slide === 0) return;

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      if (slide === 2 && !hasEntered) {
        handleEnterSite();
        return;
      }
      advanceSlide();
    }, currentDuration);
  }, [isPaused, slide, currentDuration, advanceSlide, hasEntered]);

  useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slide, isPaused, scheduleNext]);

  useEffect(() => {
    if (isPaused || slide === 0) return;

    startTimeRef.current = Date.now();
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [slide, isPaused]);

  const goTo = useCallback((index: number) => {
    setSlide(index);
  }, []);

  const scrollToNext = () => {
    document
      .getElementById("statement-percepcion")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTimeUpdate = (val: number) => {
    if (slide === 0) setTime(val);
  };

  // BUGFIX: el oso avanza SIEMPRE al terminar, sin depender de isPaused
  const handleVideoEnded = useCallback(() => {
    if (slide === 0) {
      advanceSlide();
    }
  }, [slide, advanceSlide]);

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

  return (
    <section
      id="hero-section"
      className="relative h-screen bg-[#050505] overflow-hidden select-none lg:cursor-none"
    >
      {/* Click en cualquier parte del hero revela el sitio */}
      <div
        className="absolute inset-0 z-[25] cursor-pointer"
        onClick={handleEnterSite}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 0: Solo el oso.                        */}
      {/* ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ x: `${(0 - slide) * 100}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <BearVideo
          isActive={slide === 0}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 1: Transición sutil — espiral dorada  */}
      {/* ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505] px-6"
        animate={{ x: `${(1 - slide) * 100}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <GoldenSpiral isActive={slide === 1} />
      </motion.div>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 2: Motion Lambda + estrellas + CTA      */}
      {/* Hover aquí pausa el timer de auto-advance     */}
      {/* ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-20 bg-[#050505]"
        animate={{ x: `${(2 - slide) * 100}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <LambdaCanvas isActive={slide === 2} />

        {/* CTA — esquina inferior izquierda */}
        <div
          className="absolute bottom-10 left-8 md:left-14 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleEnterSite}
            className="group flex items-center gap-3 text-neutral-500 hover:text-gold transition-colors duration-500 cursor-hover"
          >
            <span className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-mono">
              Ingresar
            </span>
            <ArrowDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </motion.div>

      {/* ── Dots de navegación ── */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-3 pointer-events-none">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-hover ${
              slide === i
                ? "w-8 bg-gold"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Ir a escena ${i + 1}`}
          />
        ))}
      </div>

      {/* Línea glow inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent pointer-events-none z-30" />
    </section>
  );
}
