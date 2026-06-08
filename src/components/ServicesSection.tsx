import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "../data";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".discipline-card");
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ── Watermark parallax ──
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 150 },
          {
            y: -150,
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
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── Premium 3D Card Stacking Deck Animation (GSAP Pinned Scroll) ──
      if (cards.length > 0) {
        // Shorter scroll distance on mobile for better UX
        const scrollMultiplier = isMobile ? 60 : 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${cards.length * scrollMultiplier}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // We animate card 1 to 5 (card 0 starts visible and active)
        cards.forEach((card, idx) => {
          if (idx === 0) return; // Skip card 0

          // 1. Current card slides up from bottom of screen to its center base
          tl.fromTo(
            card,
            { y: "100vh", opacity: 0.8 },
            {
              y: "0vh",
              opacity: 1,
              duration: 1,
              ease: "none",
            }
          );

          // 2. Simultaneously scale down and translate up ALL cards stacked underneath
          for (let j = 0; j < idx; j++) {
            const targetScale = 1 - (idx - j) * 0.035; // 3D Layering shrinkage
            const targetTranslateY = -(idx - j) * (isMobile ? 6 : 12); // Smaller offset on mobile

            tl.to(
              cards[j],
              {
                scale: targetScale,
                y: `${targetTranslateY}px`,
                opacity: 1 - (idx - j) * 0.12, // Slight darkening to increase focus on top card
                duration: 1,
                ease: "none",
              },
              "<" // Start at exact same time as current card slides up
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative min-h-screen bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans"
    >
      {/* Decorative watermark — CON PARALLAX */}
      <div
        ref={watermarkRef}
        className="absolute left-[-5vw] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015] text-[30vw] font-serif italic text-white leading-none whitespace-nowrap will-change-transform"
      >
        Disciplinas
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.008] rounded-full blur-3xl pointer-events-none" />

      {/* Pinned viewport layout */}
      <div className="h-screen w-full flex flex-col justify-between py-6 sm:py-8 md:py-10 px-5 sm:px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative z-10 overflow-hidden">
        
        {/* FIXED HEADER */}
        <div className="w-full">
          <h2
            ref={headlineRef}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-100 font-light"
          >
            Disciplinas de <span className="text-gold italic font-normal">Posicionamiento.</span>
          </h2>
          <p className="mt-3 sm:mt-5 max-w-2xl font-sans text-xs sm:text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            Servicios que diseñamos para construir una presencia digital coherente.
          </p>
        </div>

        {/* CARDS CONTAINER */}
        <div
          ref={cardsContainerRef}
          className="relative flex-1 w-full flex items-center justify-center my-10 sm:my-16 md:my-20 md:my-24 h-[45vh] sm:h-[55vh]"
        >
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="discipline-card absolute w-[calc(100%-8px)] sm:w-full max-w-4xl h-[44vh] sm:h-[52vh] bg-[#0B0B0C] border border-gold/15 hover:border-gold/30 rounded-xl sm:rounded-2xl flex flex-col justify-between p-5 sm:p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group transition-colors duration-300 will-change-transform"
              style={{
                zIndex: idx + 1,
              }}
            >
              {/* Subtle top laser glow accent */}
              <div className="absolute top-0 left-8 sm:left-12 w-1/4 h-[1px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Elegant golden side bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] sm:w-[3px] bg-gold/20 group-hover:bg-gold/45 rounded-l-xl sm:rounded-l-2xl transition-colors duration-500" />

              {/* CARD HEADER */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4 md:pb-6 select-none">
                <span className="font-mono text-[10px] sm:text-xs text-gold font-bold">
                  [{String(idx + 1).padStart(2, "0")} / 06]
                </span>
                <span className="font-mono text-[7px] sm:text-[9px] md:text-[10px] tracking-widest text-neutral-500 uppercase hidden sm:block">
                  {service.subtitle}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="my-auto">
                <h3 className="text-xl sm:text-2xl md:text-4xl font-serif text-neutral-100 font-light tracking-tight group-hover:text-gold transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="mt-2 sm:mt-4 text-neutral-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light leading-relaxed max-w-2xl font-sans">
                  {service.description}
                </p>
              </div>

              {/* CARD FOOTER — Deliverables */}
              <div className="border-t border-white/5 pt-3 sm:pt-4 md:pt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 select-none">
                {service.deliverables?.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-2 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-[#C5A059]"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white mt-1 shrink-0" />
                    <span className="leading-snug">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM METADATA RAIL */}
        <div className="w-full flex justify-between items-center border-t border-white/5 pt-2 sm:pt-4 select-none">
          <span className="font-mono text-[6px] sm:text-[8px] text-neutral-600 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
            
          </span>
          <span className="font-mono text-[6px] sm:text-[8px] text-gold uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            INGENIERÍA DE POSICIONAMIENTO
          </span>
        </div>

      </div>
    </section>
  );
}
