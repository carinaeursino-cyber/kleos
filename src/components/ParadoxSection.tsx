import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { paradoxProblems } from "../data";
import { ShieldAlert, EyeOff, Scale, HelpCircle } from "lucide-react";

export default function ParadoxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const finalBlockRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const problemIcons = [
    <Scale className="w-5 h-5 text-gold" key="scale" />,
    <EyeOff className="w-5 h-5 text-gold" key="eyeoff" />,
    <ShieldAlert className="w-5 h-5 text-gold" key="shieldalert" />,
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Watermark parallax (se mueve más lento que el scroll) ──
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // ── Headline reveal ──
      gsap.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // ── Cards stagger reveal ──
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".paradox-card");
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // ── Final block reveal ──
      gsap.from(finalBlockRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: finalBlockRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="paradox-section"
      className="relative py-32 md:py-48 lg:py-64 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans"
    >
      {/* Editorial Watermark — CON PARALLAX */}
      <div
        ref={watermarkRef}
        className="absolute right-[-5vw] top-40 select-none pointer-events-none opacity-[0.012] text-[25vw] font-serif italic text-white leading-none will-change-transform"
      >
        Kleos
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* ================= HEADLINE OVERSIZED ================= */}
        <div className="mb-32 md:mb-48">
          <h2
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif tracking-tight leading-[0.85] text-neutral-100 font-light max-w-5xl"
          >
            La realidad <br />
            <span className="text-gold italic font-normal">digital es simple.</span>
          </h2>
        </div>

        {/* ================= LAS TRES BRECHAS ================= */}
        <div className="mb-32 md:mb-48">
          {/* Section Indicator */}
          <div className="flex items-center gap-4 mb-20 select-none justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
              LAS TRES BRECHAS DE POSICIONAMIENTO
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent ml-4" />
          </div>

          {/* Cards Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paradoxProblems.map((problem, idx) => (
              <div
                key={problem.id}
                className="paradox-card bg-[#0B0B0C] border border-white/10 hover:border-gold/30 p-8 rounded-xl flex flex-col justify-between transition-all duration-300 relative group h-full shadow-lg"
              >
                {/* Accent element */}
                <div className="absolute top-0 left-8 w-1/4 h-[1px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header & Counter */}
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                    <span className="font-mono text-xs text-gold/60 font-bold">
                      [{problem.id}]
                    </span>
                    <div className="w-8 h-8 rounded-md bg-[#050505] border border-white/5 flex items-center justify-center">
                      {problemIcons[idx]}
                    </div>
                  </div>

                  {/* Problem Statement */}
                  <h4 className="text-lg md:text-xl font-serif text-white mb-4 tracking-tight leading-snug group-hover:text-gold transition-colors duration-300">
                    {problem.title}
                  </h4>
                </div>

                {/* Explanatory description */}
                <p className="text-neutral-450 text-xs md:text-sm leading-relaxed font-light font-sans pt-4 border-t border-white/5 mt-4 text-neutral-450">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= REPOSICIONAMIENTO ================= */}
        <div
          ref={finalBlockRef}
          className="relative rounded-2xl bg-gradient-to-b from-[#0A0A0B] to-[#040405] border border-white/10 p-10 md:p-16 lg:p-24 overflow-hidden shadow-2xl"
        >
          {/* Subtle liquid gold vector gradient background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Action Icon Callout */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-14 h-14 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold mb-4">
                <HelpCircle className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-[#C5A059] uppercase block font-bold">
                MÉTODO KLEOS
              </span>
              <span className="font-mono text-[9px] text-neutral-600 uppercase block tracking-wider mt-0.5">
                STATUS ALIGNMENT
              </span>
            </div>

            {/* Repositioning Text */}
            <div className="lg:col-span-9 space-y-8">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-100 leading-snug tracking-wide font-light">
                “En KLEOS no diseñamos piezas. <br />
                <span className="text-gold italic font-normal">
                  Diseñamos percepción.
                </span>
                ”
              </h3>
              <div className="h-px bg-white/10 w-24" />
              <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed max-w-2xl font-sans">
                Convertimos negocios sólidos en marcas que se perciben al mismo
                nivel que su trabajo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
