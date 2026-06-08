import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParadoxProblem {
  id: string;
  title: string;
  description: string;
}

const paradoxProblems: ParadoxProblem[] = [
  {
    id: "01",
    title: "Te comparan por precio, no por valor",
    description: "Si tu presencia no comunica nivel, eres una opción más.",
  },
  {
    id: "02",
    title: "Generas interés, pero no credibilidad",
    description:
      "Las personas investigan tu marca antes de hablar contigo. La percepción decide antes que la conversación.",
  },
  {
    id: "03",
    title: "Tu comunicación no sostiene lo que haces",
    description:
      "Redes sociales sin estructura generan atención, no posicionamiento.",
  },
  {
    id: "04",
    title: "Tu negocio se ve más pequeño de lo que es",
    description: "Y eso afecta decisiones antes de cualquier reunión.",
  },
];

export default function ParadoxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsBlockRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const finalBlockRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".paradox-card");
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
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

      if (headlineRef.current) {
        const line1 = headlineRef.current.querySelector(".headline-line-1");
        const line2 = headlineRef.current.querySelector(".headline-line-2");

        const parallaxAmount = isMobile ? "3vw" : "6vw";

        gsap.fromTo(
          line1,
          { x: parallaxAmount },
          {
            x: `-${parallaxAmount}`,
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
          { x: `-${parallaxAmount}` },
          {
            x: parallaxAmount,
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

      if (cards.length > 0 && cardsBlockRef.current) {
        const scrollMultiplier = isMobile ? 60 : 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsBlockRef.current,
            start: "top top",
            end: `+=${cards.length * scrollMultiplier}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, idx) => {
          if (idx === 0) return;

          tl.fromTo(
            card,
            isMobile
              ? { y: "100vh", opacity: 0.8 }
              : { x: "-100vw", opacity: 0.8 },
            {
              ...(isMobile ? { y: "0vh" } : { x: "0vw" }),
              opacity: 1,
              duration: 1,
              ease: "none",
            }
          );

          for (let j = 0; j < idx; j++) {
            const targetScale = 1 - (idx - j) * 0.035;
            const shift = isMobile ? -(idx - j) * 8 : -(idx - j) * 45;

            tl.to(
              cards[j],
              {
                scale: targetScale,
                ...(isMobile
                  ? { y: `${shift}px` }
                  : { x: `${shift}px` }),
                opacity: 1 - (idx - j) * 0.15,
                duration: 1,
                ease: "none",
              },
              "<"
            );
          }
        });

        tl.to({}, { duration: 0.85 });
      }

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
      <div
        ref={watermarkRef}
        className="absolute right-[-5vw] top-40 select-none pointer-events-none opacity-[0.012] text-[25vw] font-serif italic text-white leading-none will-change-transform"
      >
        Kleos
      </div>

      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-20 lg:pb-28 px-5 sm:px-6 md:px-12 lg:px-24 max-w-6xl mx-auto select-none overflow-hidden w-full flex flex-col justify-start">
        <div className="mb-4 sm:mb-8 md:mb-10 lg:mb-12">
          <p className="font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] text-gold uppercase mb-3">
            La Paradoja
          </p>
        </div>

        <h2
          ref={headlineRef}
          className="text-9xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif tracking-tight leading-[0.85] text-neutral-100 font-light max-w-none flex flex-col gap-2 sm:gap-3"
        >
          <span className="headline-line-1 block will-change-transform pb-2">
            La realidad
          </span>
          <span className="headline-line-2 block text-gold italic font-normal will-change-transform pb-2 self-end sm:self-auto">
            digital es simple
          </span>
        </h2>
      </div>

      <div
        ref={cardsBlockRef}
        className="relative w-full h-screen bg-[#050505] flex flex-col justify-between py-10 sm:py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 w-full select-none">
          <div className="flex items-center gap-3 sm:gap-4 justify-between">
            <span className="font-mono text-[7px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-gold uppercase">
              LAS CUATRO BRECHAS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gold/15 to-transparent ml-2 sm:ml-4" />
          </div>
        </div>

        <div
          ref={cardsContainerRef} id="brechas-section"
          className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center h-[45vh] sm:h-[52vh] my-2 sm:my-4 px-4 sm:px-6 md:px-12"
        >
          {paradoxProblems.map((problem, idx) => (
            <div
              key={problem.id}
              className="paradox-card absolute w-[calc(100%-16px)] sm:w-full max-w-3xl h-[42vh] sm:h-[48vh] min-h-[240px] sm:min-h-[280px] max-h-[380px] sm:max-h-[400px] bg-[#0B0B0C] border border-gold/15 hover:border-gold/30 rounded-xl sm:rounded-2xl flex flex-col justify-between p-5 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group transition-colors duration-300 will-change-transform origin-center"
              style={{ zIndex: idx + 1 }}
            >
              <div className="absolute top-0 left-8 sm:left-12 w-1/4 h-[1px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute left-0 top-0 bottom-0 w-[2px] sm:w-[3px] bg-gold/20 group-hover:bg-gold/45 rounded-l-xl sm:rounded-l-2xl transition-colors duration-500" />

              <div className="flex justify-between items-center border-b border-white/5 pb-2 sm:pb-3 md:pb-4 select-none">
                <span className="font-mono text-[10px] sm:text-xs text-gold font-bold">
                  {problem.id}
                </span>
              </div>

              <div className="my-auto">
                <h4 className="text-lg sm:text-xl md:text-3xl font-serif text-neutral-100 mb-2 sm:mb-3 tracking-tight leading-snug group-hover:text-gold transition-colors duration-500">
                  {problem.title}
                </h4>
                <p className="text-neutral-400 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed font-light font-sans mt-2 sm:mt-3 max-w-2xl">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 w-full flex justify-between items-center border-t border-white/5 pt-2 sm:pt-3 select-none">
          <span className="font-mono text-[6px] sm:text-[8px] text-neutral-600 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
            SÉ INCONFUNDIBLE
          </span>
          <span className="font-mono text-[6px] sm:text-[8px] text-gold uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            BRECHAS
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 pt-8 sm:pt-16 md:pt-24 lg:pt-32 pb-16 sm:pb-32 md:pb-48">
        <div
          ref={finalBlockRef}
          className="relative rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0A0A0B] to-[#040405] border border-white/10 p-6 sm:p-10 md:p-16 lg:p-24 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center relative z-10">
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold mb-4 animate-pulse">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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

              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#C5A059] uppercase block font-bold">
                MÉTODO KLEOS
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-neutral-600 uppercase block tracking-wider mt-0.5">
                STATUS ALIGNMENT
              </span>
            </div>

            <div className="lg:col-span-9 space-y-5 sm:space-y-6 md:space-y-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-100 leading-snug tracking-wide font-light">
                En KLEOS no diseñamos piezas. <br />
                <span className="text-gold italic font-normal">
                  Diseñamos percepción.
                </span>
              </h3>

              <div className="h-px bg-white/10 w-24" />

              <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl font-sans">
                Convertimos negocios sólidos en marcas que se perciben al mismo
                nivel que su trabajo real.
              </p>

              <button
                onClick={() => navigate("/contacto")}
                className="cursor-hover inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 border border-gold/30 hover:border-gold hover:bg-gold/5 text-gold text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] rounded-full transition-all duration-300 mt-2"
              >
                Hablemos
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
