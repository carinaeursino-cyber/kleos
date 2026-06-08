import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Embajadoras digitales
import model1 from "../assets/models/model1.png";
import model2 from "../assets/models/model2.png";
import model3 from "../assets/models/model3.png";
import model4 from "../assets/models/model4.png";
import model5 from "../assets/models/model5.png";
import model6 from "../assets/models/model6.png";
import model7 from "../assets/models/model7.png";
import model8 from "../assets/models/model8.png";

// Showcases web
import web1 from "../assets/web/web1.png";
import web2 from "../assets/web/web2.png";
import web3 from "../assets/web/web3.png";
import web4 from "../assets/web/web4.png";
import web5 from "../assets/web/web5.png";

const MODELS = [model1, model2, model3, model4, model5, model6, model7, model8];
const WEBS = [web1, web2, web3, web4, web5];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const mockup1Ref = useRef<HTMLDivElement>(null);
  const mockup2Ref = useRef<HTMLDivElement>(null);

  const [currentModelIdx, setCurrentModelIdx] = useState(0);
  const [currentWebIdx, setCurrentWebIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIdx((prev) => (prev + 1) % MODELS.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWebIdx((prev) => (prev + 1) % WEBS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=120%" : "+=180%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      gsap.set(headerRef.current, { opacity: 1, y: 0 });
      gsap.set(text1Ref.current, { opacity: 1, y: 0 });
      gsap.set(mockup1Ref.current, { y: "0vh", scale: 1, opacity: 1 });

      gsap.set(text2Ref.current, { opacity: 0, y: 30 });
      gsap.set(mockup2Ref.current, { y: "100vh", scale: 0.92, opacity: 0 });

      tl
        .to({}, { duration: 0.55 })
        .to(mockup1Ref.current, { y: "-100vh", scale: 0.92, opacity: 0, duration: 1.05 })
        .to(text1Ref.current, { opacity: 0, y: -24, duration: 0.8 }, "-=0.9")
        .to(headerRef.current, { opacity: 0, y: -24, duration: 0.75 }, "-=0.9")
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.35")
        .to(mockup2Ref.current, { y: "0vh", scale: 1, opacity: 1, duration: 1.05 }, "-=0.8")
        .to({}, { duration: 0.75 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-section"
      className="relative h-screen bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans flex items-center justify-center"
    >
      <style>{`
        @keyframes behance3D {
          0%, 100% { transform: perspective(1500px) rotateX(8deg) rotateY(-14deg) rotateZ(-1deg) translateY(0px); }
          50% { transform: perspective(1500px) rotateX(15deg) rotateY(12deg) rotateZ(1deg) translateY(-16px); }
        }
        .rotate-3d-iphone-17 {
          transform-style: preserve-3d;
          animation: behance3D 8s ease-in-out infinite;
        }
        @media (max-width: 767px) {
          .rotate-3d-iphone-17 {
            animation: behance3D 10s ease-in-out infinite;
            transform: perspective(1500px) rotateX(4deg) rotateY(-6deg) rotateZ(0deg) translateY(0px);
          }
        }

        @keyframes tv3D {
          0%, 100% { transform: perspective(1500px) rotateX(4deg) rotateY(-18deg) rotateZ(1deg) translateY(0px); }
          50% { transform: perspective(1500px) rotateX(9deg) rotateY(-12deg) rotateZ(-1deg) translateY(-12px); }
        }
        .rotate-3d-tv {
          transform-style: preserve-3d;
          animation: tv3D 8.5s ease-in-out infinite;
        }
        @media (max-width: 767px) {
          .rotate-3d-tv {
            animation: none;
            transform: perspective(1500px) rotateX(2deg) rotateY(-4deg) rotateZ(0deg);
          }
        }

        @keyframes goldenTrace {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .golden-trace-frame {
          position: absolute;
          inset: -2px;
          border-radius: 1.6rem;
          padding: 2px;
          pointer-events: none;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 245deg,
            rgba(197, 160, 89, 0.18) 270deg,
            rgba(245, 211, 141, 0.95) 292deg,
            rgba(197, 160, 89, 0.22) 315deg,
            transparent 340deg,
            transparent 360deg
          );
          animation: goldenTrace 5.2s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.95;
          z-index: 30;
        }
      `}</style>

      <div
        ref={watermarkRef}
        className="absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.012] text-[25vw] font-serif italic text-white leading-none whitespace-nowrap will-change-transform"
      >
        Autoridad
      </div>

      <div className="h-screen w-full flex flex-col justify-start pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 px-4 sm:px-6 md:px-12 lg:px-24 max-w-6xl mx-auto relative overflow-hidden z-10">
        {/* Section header */}
        <div ref={headerRef} className="w-full select-none pb-1 max-w-4xl">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-100 font-light">
            Arquitectura de <span className="text-gold italic font-normal">Percepción</span>
          </h2>
          <p className="mt-2 sm:mt-4 max-w-2xl font-sans text-[10px] sm:text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
            Una selección de sistemas visuales diseñados para demostrar cómo una marca puede verse,
            sentirse y recordarse cuando la percepción está dirigida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 md:gap-16 items-center w-full flex-1 min-h-0 mt-3 sm:mt-4 md:mt-6 relative">
          {/* LEFT STACK */}
          <div className="md:col-span-6 h-full relative flex items-center justify-center">
            {/* MOCKUP 01: iPhone / Embajadoras */}
            <div
              ref={mockup1Ref}
              className="absolute w-[195px] sm:w-[210px] md:w-[225px] lg:w-[235px] aspect-[9/19.5] will-change-transform z-10 md:translate-x-[24px]"
            >
              <div className="rotate-3d-iphone-17 w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="absolute inset-6 bg-black rounded-[50px] blur-2xl pointer-events-none"
                  style={{ transform: "translateZ(-30px)", opacity: 0.95 }}
                />

                {/* Copper chassis */}
                <div
                  className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-[#F0A15D] via-[#C9652E] to-[#6F2E18] shadow-[inset_0_2px_10px_rgba(255,210,150,0.28),_inset_0_-18px_28px_rgba(45,14,5,0.65),_0_0_0_1px_rgba(255,180,105,0.22)] border border-[#D67A3E]/55"
                  style={{ transform: "translateZ(-10px)", transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute left-[-4px] top-12 bottom-12 w-[8px] bg-gradient-to-b from-[#D77A3E] via-[#A94F25] to-[#5C2412] rounded"
                    style={{ transform: "rotateY(-90deg) translateZ(4px)" }}
                  />
                  <div
                    className="absolute right-[-4px] top-12 bottom-12 w-[8px] bg-gradient-to-b from-[#E08A4B] via-[#B9572A] to-[#642815] rounded"
                    style={{ transform: "rotateY(90deg) translateZ(4px)" }}
                  />
                  <div
                    className="absolute bottom-[-4px] left-12 right-12 h-[8px] bg-gradient-to-r from-[#7A3219] via-[#C9652E] to-[#4E1F10] rounded-b flex items-center justify-center gap-3"
                    style={{ transform: "rotateX(90deg) translateZ(4px)", transformStyle: "preserve-3d" }}
                  >
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                    <div className="w-6 h-2 bg-[#1A0A05] rounded-sm border border-[#3B160B] shadow-inner" />
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                  </div>
                  <div className="absolute left-[-5px] top-24 w-1.2 h-8 bg-gradient-to-b from-[#E18A4A] to-[#8B3B1D] rounded-l border-y border-l border-[#3B160B]/55 shadow" style={{ transform: "translateZ(1px)" }} />
                  <div className="absolute left-[-5px] top-36 w-1.2 h-8 bg-gradient-to-b from-[#E18A4A] to-[#8B3B1D] rounded-l border-y border-l border-[#3B160B]/55 shadow" style={{ transform: "translateZ(1px)" }} />
                  <div className="absolute right-[-5px] top-32 w-1.2 h-12 bg-gradient-to-b from-[#F0A15D] to-[#9C4421] rounded-r border-y border-r border-[#3B160B]/55 shadow" style={{ transform: "translateZ(1px)" }} />
                </div>

                {/* Screen */}
                <div
                  className="absolute inset-1 rounded-[44px] overflow-hidden bg-neutral-950 border border-[#3A160B] shadow-[inset_0_0_0_1px_rgba(255,180,105,0.10),_inset_0_0_22px_rgba(0,0,0,0.95)]"
                  style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
                >
                  {/* iOS-style editing interface */}
                  <div className="absolute inset-0 bg-black">
                    <div className="absolute top-2.5 left-3 right-3 z-40 flex items-center justify-between select-none">
                      <span className="px-2 py-1 rounded-full bg-white/10 border border-white/8 text-[5px] sm:text-[6px] font-mono text-neutral-300 tracking-tight">
                        Cancelar
                      </span>
                      <span className="px-2 py-1 rounded-full bg-[#F2D34B] text-[5px] sm:text-[6px] font-mono font-bold text-black tracking-tight shadow-[0_0_12px_rgba(242,211,75,0.25)]">
                        Listo
                      </span>
                    </div>

                    <div className="absolute top-8 left-3 right-3 z-40 flex items-center justify-between select-none">
                      <div className="flex items-center gap-1">
                        <span className="w-5 h-4 rounded-full bg-white/10 border border-white/8 flex items-center justify-center text-[6px] sm:text-[8px] text-neutral-400">↶</span>
                        <span className="w-5 h-4 rounded-full bg-white/10 border border-white/8 flex items-center justify-center text-[6px] sm:text-[8px] text-neutral-400">↷</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-5 h-4 rounded-full bg-white/10 border border-white/8 flex items-center justify-center text-[6px] sm:text-[8px] text-neutral-400">◎</span>
                        <span className="w-6 h-4 rounded-full bg-white/10 border border-white/8 flex items-center justify-center text-[6px] sm:text-[8px] text-neutral-400">•••</span>
                      </div>
                    </div>

                    <div className="absolute left-[10px] sm:left-[13px] right-[10px] sm:right-[13px] top-[56px] sm:top-[70px] bottom-[88px] sm:bottom-[108px] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#030303]">
                      {MODELS.map((model, idx) => (
                        <div
                          key={idx}
                          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                          style={{
                            opacity: currentModelIdx === idx ? 1 : 0,
                            zIndex: currentModelIdx === idx ? 10 : 1,
                          }}
                        >
                          <img
                            src={model}
                            alt="Modelo Exclusiva KLEOS"
                            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
                          />
                        </div>
                      ))}
                      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
                      <span className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-sm bg-white/10 text-[4px] sm:text-[5px] font-mono uppercase tracking-[0.18em] text-white/55">
                        KLEOS IA
                      </span>
                    </div>

                    <div className="absolute left-3 sm:left-4 right-3 sm:right-4 bottom-[44px] sm:bottom-[56px] z-40 h-7 sm:h-9 flex items-center gap-1 overflow-hidden select-none">
                      {MODELS.concat(MODELS).slice(0, 10).map((model, idx) => (
                        <div
                          key={idx}
                          className={`relative h-6 w-4 sm:h-8 sm:w-5 shrink-0 rounded-[3px] overflow-hidden border ${
                            idx % MODELS.length === currentModelIdx ? "border-[#F2D34B]" : "border-white/10"
                          }`}
                        >
                          <img src={model} alt="Frame IA" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#F2D34B] shadow-[0_0_10px_rgba(242,211,75,0.75)]" />
                    </div>

                    <div className="absolute left-0 right-0 bottom-0 z-40 h-[42px] sm:h-[52px] bg-black/95 border-t border-white/8 flex items-center justify-center gap-3 sm:gap-4 select-none">
                      {["Estilo", "Ajustar", "Recortar", "Borrar"].map((tool) => (
                        <div key={tool} className="flex flex-col items-center gap-0.5 sm:gap-1 text-neutral-500">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/10 bg-white/[0.04]" />
                          <span className="font-mono text-[4px] sm:text-[5px] tracking-tight">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-50 mix-blend-overlay" />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 sm:w-26 h-4 sm:h-5.5 bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-inner" style={{ transform: "translateZ(14px)" }} />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-[2px] sm:h-[3px] rounded-full bg-white/20 z-50" />
                </div>
              </div>
            </div>

            {/* TEXT 02 */}
            <div
              ref={text2Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left select-none pointer-events-none"
            >
              <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-6 md:px-0 md:pr-10 lg:pr-14">
                <span className="font-mono text-[10px] sm:text-xs md:text-sm text-gold tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold block whitespace-nowrap">
                  02 / CASO VISUAL
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.05] tracking-tight">
                  Diseño Web <br />
                  <span className="text-gold italic font-normal font-light">Personalizado</span>
                </h3>
                <p className="font-sans text-neutral-400 text-[10px] sm:text-xs md:text-sm lg:text-base font-light leading-relaxed">
                  Diseñamos presencias digitales a medida para cualquier nicho, sector o escala. Esculpimos herramientas de conversión sin fricción que reescriben tu autoridad ante el mercado premium.
                </p>

                <div className="pt-3 sm:pt-4 space-y-1.5 sm:space-y-2 select-none">
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex justify-between text-[7px] sm:text-[8px] font-mono text-gold tracking-widest uppercase">
                      <span>SITIO WEB A MEDIDA</span>
                      <span>{currentWebIdx + 1} / {WEBS.length}</span>
                    </div>
                    <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-300"
                        style={{ width: `${((currentWebIdx + 1) / WEBS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-[7px] sm:text-[8px] font-mono text-[#E5C383]/70 tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5C383]/70 animate-pulse" />
                    <span>ARQUITECTURA UX · AUTORIDAD DIGITAL · CONVERSIÓN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STACK */}
          <div className="md:col-span-6 h-full relative flex items-center justify-center">
            {/* TEXT 01 */}
            <div
              ref={text1Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left select-none pointer-events-none md:translate-x-[16px]"
            >
              <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-6 md:px-0">
                <span className="font-mono text-[10px] sm:text-xs md:text-sm text-gold tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold block">
                  01 / CASO VISUAL
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.05] tracking-tight">
                  Embajadoras <br />
                  <span className="text-gold italic font-normal">Digitales IA</span>
                </h3>
                <p className="font-sans text-neutral-400 text-[10px] sm:text-xs md:text-sm md:text-base font-light leading-relaxed">
                  Diseñamos embajadoras digitales hiperrealistas para representar marcas, conectar con audiencias y potenciar su presencia digital.
                </p>

                <div className="pt-3 sm:pt-4 space-y-1.5 sm:space-y-2 select-none">
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex justify-between text-[7px] sm:text-[8px] font-mono text-gold tracking-widest uppercase">
                      <span>EMBAJADORA DIGITAL</span>
                      <span>{currentModelIdx + 1} / {MODELS.length}</span>
                    </div>
                    <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-300"
                        style={{ width: `${((currentModelIdx + 1) / MODELS.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-[7px] sm:text-[8px] font-mono text-[#E5C383]/70 tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5C383]/70 animate-pulse" />
                    <span>IDENTIDAD VISUAL · PRESENCIA DE MARCA · REPRESENTACIÓN IA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MOCKUP 02 */}
            <div
              ref={mockup2Ref}
              className="absolute w-[260px] sm:w-[320px] md:w-[470px] lg:w-[520px] xl:w-[550px] aspect-[16/10] will-change-transform z-10 md:-right-4 lg:-right-8 xl:-right-10 mt-2 sm:mt-4 md:mt-8 lg:mt-10"
            >
              <div className="rotate-3d-tv w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-3 sm:inset-4 bg-black/75 rounded-2xl sm:rounded-3xl blur-2xl" style={{ transform: "translateZ(-25px)", opacity: 0.95 }} />

                <div
                  className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-[#161617] p-1.5 sm:p-2 shadow-[0_30px_70px_rgba(0,0,0,0.85),_0_0_0_1px_rgba(197,160,89,0.16),_inset_0_0_0_1px_rgba(245,211,141,0.08)] border border-gold/35 flex flex-col overflow-hidden group/tv hover:shadow-[0_30px_70px_rgba(197,160,89,0.18)] transition-shadow duration-700 ease-out"
                  style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
                >
                  <div className="golden-trace-frame" />
                  <div
                    className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative bg-[#050505] border border-black shadow-inner"
                    style={{ transform: "translateZ(6px)" }}
                  >
                    {WEBS.map((web, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{
                          opacity: currentWebIdx === idx ? 1 : 0,
                          zIndex: currentWebIdx === idx ? 10 : 1,
                        }}
                      >
                        <img
                          src={web}
                          alt="Diseño Web Personalizado KLEOS"
                          className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.03]"
                        />
                      </div>
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20 mix-blend-overlay" />

                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-[#050505]/45 backdrop-blur-md border border-white/5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl z-20 select-none">
                      <span className="font-mono text-[5px] sm:text-[6px] md:text-[7px] text-gold tracking-widest uppercase font-bold">KLEOS DIGITAL STUDIO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
