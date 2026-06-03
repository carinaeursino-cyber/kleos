import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
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

const RAIL_ITEMS = [
  { id: "paradox-section", label: "PARADOJA", idx: 0 },
  { id: "services-section", label: "DISCIPLINAS", idx: 1 },
  { id: "philosophy-section", label: "AXIOMAS", idx: 2 },
];

const LEFT_ITEMS = RAIL_ITEMS.filter((i) => i.idx % 2 === 0);
const RIGHT_ITEMS = RAIL_ITEMS.filter((i) => i.idx % 2 === 1);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // TEMP DEV MODE: show the site immediately while we polish inner sections.
  // Restore to false when we want the hero/gate experience active again.
  const [siteVisible, setSiteVisible] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Sincroniza Lenis con ScrollTrigger para evitar tirones al entrar en secciones pinned.
    // No modifica timelines ni coreografías; solo mantiene actualizado el cálculo de scroll.
    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!siteVisible) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    const triggers: ScrollTrigger[] = [];
    RAIL_ITEMS.forEach((item, idx) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(idx),
          onEnterBack: () => setActiveSection(idx),
        })
      );
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
    setMobileMenuOpen(false);

    if (!siteVisible) {
      setSiteVisible(true);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 900);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEnterSite = () => {
    if (!siteVisible) setSiteVisible(true);
  };

  return (
    <div className="bg-[#050505] text-[#F5F5F5] min-h-screen selection:bg-gold/30 selection:text-white overflow-x-hidden font-sans editorial-grain lg:cursor-none">
      <CustomCursor />

      {/* ═══════════════════════════════════════════════════ */}
      {/* LEFT RAIL — Lambda + secciones pares             */}
      {/* ═══════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-24 h-full border-r border-white/[0.06] flex-col items-center justify-between py-14 z-40 bg-[#050505]/60 backdrop-blur-md select-none">
        {/* Top: Isotipo Lambda miniatura */}
        <div className="flex flex-col items-center pt-4">
          <svg
            className="w-7 h-7 md:w-8 md:h-8"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 22 88 L 36 88 L 50 20 L 64 88 L 78 88"
              stroke="#C5A059"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 2px rgba(197,160,89,0.4))"
            />
            <path
              d="M 22 88 L 36 88 L 50 20 L 64 88 L 78 88"
              stroke="#E5C383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </div>

        <div className="flex-1" />

        {/* Bottom: secciones pares */}
        <div className="flex flex-col items-center gap-6 pb-4">
          {LEFT_ITEMS.map((item) => {
            const isActive = activeSection === item.idx;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-hover transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-30 hover:opacity-70"
                }`}
              >
                <div className="rotate-[-90deg] whitespace-nowrap flex items-center gap-2">
                  <span
                    className={`font-mono text-[8px] tracking-[0.2em] uppercase ${
                      isActive ? "text-gold font-bold" : "text-neutral-600"
                    }`}
                  >
                    {String(item.idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-neutral-700">·</span>
                  <span
                    className={`font-mono text-[8px] tracking-[0.25em] uppercase ${
                      isActive ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════ */}
      {/* RIGHT RAIL — Slogan + secciones impares          */}
      {/* ═══════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex fixed right-0 top-0 bottom-0 w-24 h-full border-l border-white/[0.06] flex-col items-center justify-between py-14 z-40 bg-[#050505]/60 backdrop-blur-md select-none">
        {/* Top: Slogan vertical nativo, más legible */}
        <div className="flex flex-col items-center pt-4">
          <span
            className="font-mono text-[10px] tracking-[0.25em] text-gold/60 uppercase font-medium"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            SÉ INCONFUNDIBLE
          </span>
        </div>

        <div className="flex-1" />

        {/* Bottom: secciones impares */}
        <div className="flex flex-col items-center gap-6 pb-4">
          {RIGHT_ITEMS.map((item) => {
            const isActive = activeSection === item.idx;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-hover transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-30 hover:opacity-70"
                }`}
              >
                <div className="rotate-[90deg] whitespace-nowrap flex items-center gap-2">
                  <span
                    className={`font-mono text-[8px] tracking-[0.2em] uppercase ${
                      isActive ? "text-gold font-bold" : "text-neutral-600"
                    }`}
                  >
                    {String(item.idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-neutral-700">·</span>
                  <span
                    className={`font-mono text-[8px] tracking-[0.25em] uppercase ${
                      isActive ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* HEADER */}
      <header
        id="navbar-header"
        className={`fixed top-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/5 transition-transform duration-500 ${
          siteVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("hero-section")}
            className="flex items-baseline gap-2 text-left cursor-pointer group cursor-hover"
          >
            <span className="font-serif text-2xl tracking-[0.2em] font-light text-white group-hover:text-gold transition-colors duration-300">
              KLEOS
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#C5A059]/80 uppercase">
              STUDIO
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
            {RAIL_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-neutral-400 hover:text-gold transition-colors cursor-hover"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white cursor-hover"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-8 flex flex-col justify-between pb-12"
          >
            <div className="space-y-6 flex flex-col pt-8">
              {RAIL_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-2xl font-serif hover:text-gold transition-colors py-2 border-b border-white/10"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-center font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
              KLEOS EXPERIENCE M-2026 © ALL RIGHTS SECURED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO visible, gate/block removed in dev mode: content is already available below */}
      <HeroSection onEnterSite={handleEnterSite} />

      {/* CONTENIDO */}
      <AnimatePresence>
        {siteVisible && (
          <motion.div
            key="site-content"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <main className="relative lg:pl-24 lg:pr-24">
              <StatementSection
                id="statement-percepcion"
                text="Tu trabajo no es el problema."
                highlight="La percepción de tu trabajo sí lo es."
                variant="deblur"
              />
              <ParadoxSection />
              <PortfolioSection />
              <StatementSection
                id="statement-inconfundible"
                text="No se trata de ser el mejor."
                highlight="Se trata de ser inconfundible."
                variant="principle"
              />
              <ServicesSection />
              <BrandingPhilosophies />
            </main>

            <footer
              id="footer"
              className="relative bg-[#030304] py-24 md:py-32 border-t border-white/10 font-sans text-neutral-400 lg:pl-24 lg:pr-24"
            >
              <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                <div className="mb-10">
                  <span className="font-serif text-4xl md:text-5xl tracking-[0.15em] font-light text-white">
                    K·L·E·O·S
                  </span>
                  <span className="block font-mono text-[9px] tracking-[0.4em] text-gold uppercase mt-3 font-medium">
                    STUDIO
                  </span>
                </div>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-10" />
                <p className="font-serif text-xl md:text-2xl text-neutral-200 font-light tracking-wide mb-8 max-w-lg leading-relaxed">
                  Hablemos. Nos encantaría saber de ti.
                </p>
                <a
                  href="mailto:contacto@kleos.studio"
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-gold/30 hover:border-gold hover:bg-gold/5 text-gold text-[11px] font-mono uppercase tracking-[0.25em] rounded transition-all duration-300 cursor-hover"
                >
                  Iniciar Conversación
                </a>
                <p className="mt-16 font-mono text-[9px] text-neutral-700 uppercase tracking-[0.3em]">
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
