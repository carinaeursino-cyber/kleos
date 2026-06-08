import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "./components/hero/HeroSection";
import StatementSection from "./StatementSection";
import ParadoxSection from "./components/ParadoxSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import BrandingPhilosophies from "./components/BrandingPhilosophies";
import CustomCursor from "./CustomCursor";
import KleosMenu from "./components/KleosMenu";
import ContactPage from "./pages/ContactPage";
const RAIL_ITEMS = [
  { id: "paradox-section",    label: "BRECHAS",      idx: 0 },
  { id: "portfolio-section",  label: "ARQUITECTURA", idx: 1 },
  { id: "services-section",   label: "DISCIPLINAS",  idx: 2 },
  { id: "philosophy-section", label: "AXIOMAS",      idx: 3 },
];

const LEFT_ITEMS  = RAIL_ITEMS.filter((i) => i.idx % 2 === 0);
const RIGHT_ITEMS = RAIL_ITEMS.filter((i) => i.idx % 2 === 1);

// ─────────────────────────────────────────────────────────────────
// Página principal
// ─────────────────────────────────────────────────────────────────
function HomePage() {
  const [siteVisible,   setSiteVisible]   = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // ── Lenis ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); lenisRef.current = null; };
  }, []);

  // ── Scroll Spy ──
  useEffect(() => {
    if (!siteVisible) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    const triggers: ScrollTrigger[] = [];
    RAIL_ITEMS.forEach((item, idx) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      triggers.push(ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter:     () => setActiveSection(idx),
        onEnterBack: () => setActiveSection(idx),
      }));
    });

    return () => triggers.forEach((t) => t.kill());
  }, [siteVisible]);

  useEffect(() => {
    if (siteVisible && lenisRef.current) {
      const t = setTimeout(() => lenisRef.current?.resize(), 300);
      return () => clearTimeout(t);
    }
  }, [siteVisible]);

  const scrollToSection = (id: string) => {
    if (!siteVisible) {
      setSiteVisible(true);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 900);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#050505] text-[#F5F5F5] min-h-screen selection:bg-gold/30 selection:text-white overflow-x-hidden font-sans editorial-grain lg:cursor-none safe-bottom">
      <CustomCursor />

      {/* Menú — invisible durante el hero */}
      <KleosMenu visible={siteVisible} onNavigate={scrollToSection} />

      {/* LEFT RAIL */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-24 h-full border-r border-white/[0.06] flex-col items-center justify-between py-14 z-40 bg-[#050505]/60 backdrop-blur-md select-none">
        <div className="flex flex-col items-center pt-4">
          <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 22 88 L 36 88 L 50 20 L 64 88 L 78 88" stroke="#C5A059" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0 0 2px rgba(197,160,89,0.4))"/>
            <path d="M 22 88 L 36 88 L 50 20 L 64 88 L 78 88" stroke="#E5C383" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          </svg>
        </div>
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-6 pb-4">
          {LEFT_ITEMS.map((item) => {
            const isActive = activeSection === item.idx;
            return (
              <button key={item.id} onClick={() => scrollToSection(item.id)}
                className={`cursor-hover transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-30 hover:opacity-70"}`}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                <span className={`font-mono text-[9px] tracking-[0.25em] uppercase ${isActive ? "text-gold" : "text-white/60"}`}>
                  {String(item.idx + 1).padStart(2, "0")}. {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* RIGHT RAIL */}
      <aside className="hidden lg:flex fixed right-0 top-0 bottom-0 w-24 h-full border-l border-white/[0.06] flex-col items-center justify-between py-14 z-40 bg-[#050505]/60 backdrop-blur-md select-none">
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-6" style={{ writingMode: "vertical-rl" }}>
          <span className="font-mono text-[8px] tracking-[0.3em] text-white/15 uppercase">Sé inconfundible</span>
        </div>
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-6 pb-4">
          {RIGHT_ITEMS.map((item) => {
            const isActive = activeSection === item.idx;
            return (
              <button key={item.id} onClick={() => scrollToSection(item.id)}
                className={`cursor-hover transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-30 hover:opacity-70"}`}
                style={{ writingMode: "vertical-rl" }}
              >
                <span className={`font-mono text-[9px] tracking-[0.25em] uppercase ${isActive ? "text-gold" : "text-white/60"}`}>
                  {String(item.idx + 1).padStart(2, "0")}. {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* HERO */}
      <HeroSection onEnterSite={() => { if (!siteVisible) setSiteVisible(true); }} />

      {/* CONTENIDO */}
      <AnimatePresence>
        {siteVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <main className="lg:pl-24 lg:pr-24">
              <StatementSection
                id="statement-percepcion"
                text="No estás perdiendo clientes por lo que haces."
                highlight="Estás perdiéndolos por cómo te perciben."
                variant="deblur"
              />
              <ParadoxSection />

              {/* PortfolioSection con id para el scroll spy */}
              <div id="portfolio-section">
                <PortfolioSection />
              </div>

              <StatementSection
                id="statement-inconfundible"
                text="No se trata de ser el mejor."
                highlight="Se trata de ser inconfundible."
                variant="parallax"
              />
              <ServicesSection />
              <BrandingPhilosophies />
            </main>

            <footer
              id="footer"
              className="relative bg-[#030304] py-16 sm:py-20 md:py-24 lg:py-32 border-t border-white/10 font-sans text-neutral-400 lg:pl-24 lg:pr-24"
            >
              <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 flex flex-col items-center text-center">
                <div className="mb-8 sm:mb-10">
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light">
                    <span className="text-[#C5A059]">K</span>
                    <span className="text-white">·L·E·O·S</span>
                  </span>
                  <span className="block font-mono text-[8px] sm:text-[9px] tracking-[0.4em] text-gold uppercase mt-2 sm:mt-3 font-medium">STUDIO</span>
                </div>
                <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8 sm:mb-10" />
                <p className="font-serif text-lg sm:text-xl md:text-2xl text-neutral-200 font-light tracking-wide mb-6 sm:mb-8 max-w-lg leading-relaxed">
                  Hablemos. Nos encantaría saber de ti.
                </p>
                <a
                  href="mailto:contacto@kleos.studio"
                  className="cursor-hover inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 border border-gold/30 hover:border-gold hover:bg-gold/5 text-gold text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] rounded-full transition-all duration-300"
                >
                  Iniciar Conversación
                </a>
                <p className="mt-12 sm:mt-16 font-mono text-[7px] sm:text-[9px] text-neutral-700 uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                  © 2026 KLEOS DIGITAL AGENCY
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// App root con React Router
// ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<HomePage />} />
      <Route path="/contacto"  element={<ContactPage />} />
    </Routes>
  );
}
