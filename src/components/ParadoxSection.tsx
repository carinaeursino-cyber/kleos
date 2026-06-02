import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { paradoxProblems } from "../data";

export default function ParadoxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsBlockRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const finalBlockRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".paradox-card");

    const ctx = gsap.context(() => {
      // ── Watermark parallax (moves slower than scroll) ──
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // ── Headline Right-to-Left Panoramic Scroll Glide ──
      if (headlineRef.current) {
        const line1 = headlineRef.current.querySelector(".headline-line-1");
        const line2 = headlineRef.current.querySelector(".headline-line-2");

        gsap.fromTo(
          line1,
          { x: "6vw" },
          {
            x: "-6vw",
            ease: "none",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          line2,
          { x: "-6vw" },
          {
            x: "6vw",
            ease: "none",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // ── Premium Horizontal Stacking Deck Animation (Left-to-Right) ──
      if (cards.length > 0 && cardsBlockRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsBlockRef.current,
            start: "top top",
            end: `+=${cards.length * 100}%`, // 300% of vertical scroll space
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // We animate card 1 and 2 (card 0 starts visible and active in center)
        cards.forEach((card, idx) => {
          if (idx === 0) return; // Skip card 0

          // 1. Current card slides in horizontally from left of viewport to center
          tl.fromTo(
            card,
            { x: "-100vw", opacity: 0.8 },
            {
              x: "0vw",
              opacity: 1,
              duration: 1,
              ease: "none",
            }
          );

          // 2. Simultaneously scale down and translate left ALL cards stacked underneath
          for (let j = 0; j < idx; j++) {
            const targetScale = 1 - (idx - j) * 0.035; // 3D Layering shrinkage
            const targetTranslateX = -(idx - j) * 45; // Wide and clear horizontal fanning out!

            tl.to(
              cards[j],
              {
                scale: targetScale,
                x: `${targetTranslateX}px`,
                opacity: 1 - (idx - j) * 0.15, // Smooth darkening
                duration: 1,
                ease: "none",
              },
              "<" // Starts at exact same time as current card slides up
            );
          }
        });

        // Added a generous scroll buffer tween at the end of the timeline
        tl.to({}, { duration: 0.85 });
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#050505] w-full">
      {/* Editorial Watermark — CON PARALLAX */}
      <div
        ref={watermarkRef}
        className="absolute right-[-5vw] top-40 select-none pointer-events-none opacity-[0.012] text-[25vw] font-serif italic text-white leading-none will-change-transform"
      >
        Kleos
      </div>

      {/* ================= BLOCK 1: EL TITULAR MONUMENTAL (Paseo Panorámico Limpio) ================= */}
      {/* Se renderiza de manera independiente con un aire gigante y libre en el scroll. No está fijado */}
      <div className="py-24 md:py-36 lg:py-48 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto select-none overflow-hidden w-full">
        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-gold uppercase mb-3">
          La Paradoja
        </p>
        {/* Tamaño monumental 9xl original restaurado al 100% de fuerza, sin punto final */}
        <h2
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif tracking-tight leading-[0.85] text-neutral-100 font-light max-w-none flex flex-col gap-3"
        >
          {/* Line 1 - Starts right, glides left */}
          <span className="headline-line-1 block will-change-transform whitespace-nowrap pb-2">
            La realidad
          </span>
          {/* Line 2 - Starts further right, glides further left for staggered parallax depth */}
          <span className="headline-line-2 block text-gold italic font-normal will-change-transform whitespace-nowrap pb-2 self-end md:self-auto">
            digital es simple
          </span>
        </h2>
      </div>

      {/* ================= BLOCK 2: LAS TARJETAS APILABLES (100% Protagonistas en Pinned Area) ================= */}
      {/* Fijado específicamente en cardsBlockRef. Le otorga a las tarjetas el 100% del alto de la pantalla (100vh) */}
      <div ref={cardsBlockRef} className="relative w-full h-screen bg-[#050505] flex flex-col justify-between py-16 md:py-20">
        
        {/* Indicador de sección sutil centrado arriba en la zona fija de las cartas */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 w-full select-none">
          <div className="flex items-center gap-4 justify-between">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-gold uppercase">
              LAS TRES BRECHAS DE POSICIONAMIENTO
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gold/15 to-transparent ml-4" />
          </div>
        </div>

        {/* CARDS CONTAINER: Holds the absolute stacked cards in the exact center of h-screen */}
        {/* Reduced constraints! Cards now have up to h-[52vh] with zero risk of clipping */}
        <div
          ref={cardsContainerRef}
          className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center h-[52vh] my-4 px-6 md:px-12"
        >
          {paradoxProblems.map((problem, idx) => (
            <div
              key={problem.id}
              className="paradox-card absolute w-full max-w-3xl h-[48vh] min-h-[280px] max-h-[400px] bg-[#0B0B0C] border border-gold/15 hover:border-gold/30 rounded-2xl flex flex-col justify-between p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group transition-colors duration-300 will-change-transform origin-center"
              style={{
                zIndex: idx + 1, // Capas secuenciales
              }}
            >
              {/* Línea láser de oro superior que se enciende en hover */}
              <div className="absolute top-0 left-12 w-1/4 h-[1px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Barra lateral dorada fina */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold/20 group-hover:bg-gold/45 rounded-l-2xl transition-colors duration-500" />

              {/* CARD HEADER — Removed Lucide icons to maintain an ultra-minimalistic, clean look */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 md:pb-4 select-none">
                <span className="font-mono text-xs text-gold font-bold">
                  [{problem.id}]
                </span>
              </div>

              {/* CUERPO DE TARJETA */}
              <div className="my-auto">
                <h4 className="text-xl md:text-3xl font-serif text-neutral-100 mb-3 tracking-tight leading-snug group-hover:text-gold transition-colors duration-500">
                  {problem.title}
                </h4>
                <p className="text-neutral-450 text-xs md:text-sm lg:text-base leading-relaxed font-light font-sans mt-3 max-w-2xl">
                  {problem.description}
                </p>
              </div>

              {/* PIE DE TARJETA */}
              <div className="border-t border-white/5 pt-3 text-right select-none">
                <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-wider">
                  STATUS_DISCREPANCY // 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* METADATOS INFERIORES: Posicionamiento absoluto en la base del mazo fijo */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 w-full flex justify-between items-center border-t border-white/5 pt-3 select-none">
          <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-[0.25em]">
            SÉ INCONFUNDIBLE
          </span>
          <span className="font-mono text-[8px] text-gold uppercase tracking-[0.3em]">
            BRECHAS DE POSICIONAMIENTO
          </span>
        </div>

      </div>

      {/* ================= BLOCK 3: REPOSICIONAMIENTO BANNER ================= */}
      {/* Standard document scroll flow with generous space above */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 md:pt-36 lg:pt-48 pb-32 md:pb-48">
        <div
          ref={finalBlockRef}
          className="relative rounded-2xl bg-gradient-to-b from-[#0A0A0B] to-[#040405] border border-white/10 p-10 md:p-16 lg:p-24 overflow-hidden shadow-2xl"
        >
          {/* Resplandor dorado radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Action Icon Callout */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* BUGFIX 1: Replaced HelpCircle with the premium KLEOS Isotype (Lambda Λ) inside the circular badge */}
              <div className="w-14 h-14 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold mb-4 animate-pulse">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 22 88 L 36 88 L 50 20 L 64 88 L 78 88"
                    stroke="#C5A059"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 22 88 L 36 88 L 50 20 L 64 88 L 78 88"
                    stroke="#E5C383"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                  />
                </svg>
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
              {/* BUGFIX 2: Removed starting “ and ending ” quotes around the main statement as requested */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-100 leading-snug tracking-wide font-light">
                En KLEOS no diseñamos piezas. <br />
                <span className="text-gold italic font-normal">
                  Diseñamos percepción.
                </span>
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
    </div>
  );
}
