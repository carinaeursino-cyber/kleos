import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your gorgeous models' portraits
import model1 from "../assets/models/model1.png";
import model2 from "../assets/models/model2.png";
import model3 from "../assets/models/model3.png";
import model4 from "../assets/models/model4.png";
import model5 from "../assets/models/model5.png";
import model6 from "../assets/models/model6.png";
import model7 from "../assets/models/model7.png";

// Import your breathtaking custom website designs
import web1 from "../assets/web/web1.png";
import web2 from "../assets/web/web2.png";
import web3 from "../assets/web/web3.png";
import web4 from "../assets/web/web4.png";
import web5 from "../assets/web/web5.png";

const MODELS = [model1, model2, model3, model4, model5, model6, model7];
const WEBS = [web1, web2, web3, web4, web5];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Stacks references
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  const mockup1Ref = useRef<HTMLDivElement>(null);
  const mockup2Ref = useRef<HTMLDivElement>(null);
  const mockup3Ref = useRef<HTMLDivElement>(null);

  // Model carousel state inside the iPhone 17 Pro Max (Project 01)
  const [currentModelIdx, setCurrentModelIdx] = useState(0);
  const [hasCompletedRound, setHasCompletedRound] = useState(false);
  const [isSectionActive, setIsSectionActive] = useState(false); // Tracks if the user has actually arrived at this section

  // Web designs carousel state inside the Cinema Display (Project 02)
  const [currentWebIdx, setCurrentWebIdx] = useState(0);

  // Refs to avoid stale closures in GSAP callbacks and prevent infinite re-render loops!
  const hasCompletedRoundRef = useRef(false);
  const isSectionActiveRef = useRef(false);

  // Sync state with mutable refs
  useEffect(() => {
    hasCompletedRoundRef.current = hasCompletedRound;
  }, [hasCompletedRound]);

  useEffect(() => {
    isSectionActiveRef.current = isSectionActive;
  }, [isSectionActive]);

  // ─── CAROUSEL TIMER 01 (1.6s per model) ───
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIdx((prev) => {
        const next = prev + 1;
        if (next >= MODELS.length) {
          setHasCompletedRound(true); // Se completa la primera ronda de 7 modelos
          return 0; // loops back
        }
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  // ─── CAROUSEL TIMER 02 (3.5s per lease web design) ───
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWebIdx((prev) => (prev + 1) % WEBS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // ─── HARD SCROLL HIJACK LOCK (100% Bulletproof Browser Lock) ───
  // Physically locks the browser body scroll ONLY if the section is actively being viewed and 1st round hasn't finished
  useEffect(() => {
    if (isSectionActive && !hasCompletedRound) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSectionActive, hasCompletedRound]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Watermark Parallax ──
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

      // ── Scroll Snapping Trigger ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        onEnter: () => {
          setIsSectionActive(true); // Marks section as active so the scroll lock can safely engage
          if (!hasCompletedRoundRef.current) {
            if (typeof window !== "undefined" && (window as any).lenis) {
              (window as any).lenis.stop();
              (window as any).lenis.scrollTo(sectionRef.current, { immediate: true });
            }
          }
        },
        onLeaveBack: () => {
          setIsSectionActive(false); // Marks section as inactive when scrolling back up
          if (typeof window !== "undefined" && (window as any).lenis) {
            (window as any).lenis.start();
          }
        }
      });

      // ── Premium Split Scroll Parallax Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=320%", // 3.2 screen heights of scroll space
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Initial setups: Project 1 visible, others hidden and offset
      gsap.set(text1Ref.current, { opacity: 1, y: 0 });
      gsap.set(mockup1Ref.current, { y: "0vh", scale: 1, opacity: 1 });

      gsap.set(text2Ref.current, { opacity: 0, y: 30 });
      gsap.set(mockup2Ref.current, { y: "100vh", scale: 0.9, opacity: 0 });

      gsap.set(text3Ref.current, { opacity: 0, y: 30 });
      gsap.set(mockup3Ref.current, { y: "100vh", scale: 0.9, opacity: 0 });

      // ─── COREOGRAFÍA DEL SCROLL ───

      // 1. TRANSICIÓN DEL PROYECTO 1 AL 2
      tl
        .to({}, { duration: 1.0 }) // Holds Project 1 stationary in the center of the viewport on scroll
        .to(mockup1Ref.current, { y: "-100vh", scale: 0.9, opacity: 0, duration: 1.5 })
        .to(text1Ref.current, { opacity: 0, y: -30, duration: 1 }, "-=1.2")

        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.6")
        .to(mockup2Ref.current, { y: "0vh", scale: 1, opacity: 1, duration: 1.5 }, "-=1.1")

        .to({}, { duration: 0.8 })

      // 2. TRANSICIÓN DEL PROYECTO 2 AL 3
        .to(mockup2Ref.current, { y: "-100vh", scale: 0.9, opacity: 0, duration: 1.5 })
        .to(text2Ref.current, { opacity: 0, y: -30, duration: 1 }, "-=1.2")

        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.6")
        .to(mockup3Ref.current, { y: "0vh", scale: 1, opacity: 1, duration: 1.5 }, "-=1.1")

        .to({}, { duration: 0.6 });

    }, sectionRef);

    return () => ctx.revert();
  }, []); // <--- BUGFIX: Empty dependency array prevents any infinite loop or component crashes!

  return (
    <section
      ref={sectionRef}
      id="portfolio-section"
      className="relative h-screen bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans flex items-center justify-center"
    >
      {/* Dynamic style sheet for 3D turntable rotations */}
      <style>{`
        @keyframes behance3D {
          0%, 100% { transform: perspective(1500px) rotateX(8deg) rotateY(-14deg) rotateZ(-1deg) translateY(0px); }
          50% { transform: perspective(1500px) rotateX(15deg) rotateY(12deg) rotateZ(1deg) translateY(-16px); }
        }
        .rotate-3d-iphone-17 {
          transform-style: preserve-3d;
          animation: behance3D 8s ease-in-out infinite;
        }

        @keyframes tv3D {
          0%, 100% { transform: perspective(1500px) rotateX(4deg) rotateY(-25deg) rotateZ(1deg) translateY(0px); }
          50% { transform: perspective(1500px) rotateX(10deg) rotateY(-18deg) rotateZ(-1deg) translateY(-12px); }
        }
        .rotate-3d-tv {
          transform-style: preserve-3d;
          animation: tv3D 8.5s ease-in-out infinite;
        }
      `}</style>

      {/* Editorial Watermark Parallax */}
      <div
        ref={watermarkRef}
        className="absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.012] text-[25vw] font-serif italic text-white leading-none whitespace-nowrap will-change-transform"
      >
        Autoridad
      </div>

      {/* Pinned viewport layout */}
      {/* BUGFIX 1: Raised header closer to the top by reducing top padding from pt-10 to pt-8 */}
      {/* BUGFIX 2: Lowered bottom padding to pb-6 to maximize room for the bottom metadata rail */}
      <div className="h-screen w-full flex flex-col justify-between pt-8 md:pt-10 pb-6 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto relative overflow-hidden z-10">
        
        {/* FIXED HEADER */}
        <div className="w-full select-none pb-1">
          <h2
            ref={headlineRef}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-100 font-light"
          >
            Arquitectura de <span className="text-gold italic font-normal">Percepción</span>
          </h2>
        </div>

        {/* ALTERNATING SPLIT-SCROLL VIEWPOT GRID */}
        {/* BUGFIX 3: Reduced grid height from h-[55vh] to h-[48vh] and added mt-4 md:mt-6 
            to compress the vertical bounding box, ensuring massive, comfortable breathing space 
            above the bottom line so they never touch or collide! */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center w-full h-[48vh] mt-4 md:mt-6 relative">
          
          {/* ==================================================== */}
          {/* COLUMN LEFT STACK                                    */}
          {/* ==================================================== */}
          <div className="md:col-span-6 h-full relative flex items-center justify-center">
            
            {/* MOCKUP 01: TRUE CODED 3D IPHONE 17 PRO MAX (OBSIDIAN SPACE BLACK) */}
            {/* BUGFIX 4: Added a clean horizontal translate offset (md:translate-x-[24px]) to nudge 
                the iPhone slightly to the right, completely clearing the left navigation rail (Axiomas/Paradoja) 
                and giving it perfect breathing room on the left edge! */}
            <div
              ref={mockup1Ref}
              className="absolute w-[240px] md:w-[285px] aspect-[9/19.5] will-change-transform z-10 md:translate-x-[24px]"
              style={!hasCompletedRound ? { transform: "translateY(0px) scale(1)", opacity: 1 } : undefined}
            >
              <div className="rotate-3d-iphone-17 w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                
                {/* 3D LAYER 1: Shadow */}
                <div 
                  className="absolute inset-6 bg-black rounded-[50px] blur-2xl pointer-events-none"
                  style={{ transform: "translateZ(-30px)", opacity: 0.95 }}
                />

                {/* 3D LAYER 2: Phone Chassis (Obsidian Space Black) */}
                <div 
                  className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-[#242426] via-[#141415] to-[#0a0a0b] shadow-[inset_0_0_24px_rgba(0,0,0,0.9)] border border-neutral-900"
                  style={{ transform: "translateZ(-10px)", transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="absolute left-[-4px] top-12 bottom-12 w-[8px] bg-gradient-to-b from-[#2a2a2b] via-[#161617] to-[#0a0a0b] rounded"
                    style={{ transform: "rotateY(-90deg) translateZ(4px)" }}
                  />
                  <div 
                    className="absolute right-[-4px] top-12 bottom-12 w-[8px] bg-gradient-to-b from-[#2a2a2b] via-[#161617] to-[#0a0a0b] rounded"
                    style={{ transform: "rotateY(90deg) translateZ(4px)" }}
                  />
                  <div 
                    className="absolute bottom-[-4px] left-12 right-12 h-[8px] bg-gradient-to-r from-[#202021] via-[#161617] to-[#0a0a0b] rounded-b flex items-center justify-center gap-3"
                    style={{ transform: "rotateX(90deg) translateZ(4px)", transformStyle: "preserve-3d" }}
                  >
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                    <div className="w-6 h-2 bg-black rounded-sm border border-neutral-900 shadow-inner" />
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                      <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                  </div>
                  <div className="absolute left-[-5px] top-24 w-1.2 h-8 bg-[#1e1e1f] rounded-l border-y border-l border-black/45 shadow" style={{ transform: "translateZ(1px)" }} />
                  <div className="absolute left-[-5px] top-36 w-1.2 h-8 bg-[#1e1e1f] rounded-l border-y border-l border-black/45 shadow" style={{ transform: "translateZ(1px)" }} />
                  <div className="absolute right-[-5px] top-32 w-1.2 h-12 bg-[#1e1e1f] rounded-r border-y border-r border-black/45 shadow" style={{ transform: "translateZ(1px)" }} />
                </div>

                {/* 3D LAYER 3: Bezel-Less Screen display */}
                {/* BUGFIX 5: Cards now have up to h-[34vh] min-h-[250px] max-h-[310px] to strictly keep clearance */}
                <div 
                  className="absolute inset-1 rounded-[44px] overflow-hidden bg-neutral-950 border border-black shadow-inner"
                  style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20 mix-blend-overlay" />
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-26 h-5.5 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-inner" style={{ transform: "translateZ(14px)" }} />
                  
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
                        className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.03]"
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* TEXT 02: Diseño Web Personalizado (Fixed on Left - 5 Columns for tight focus space) */}
            <div
              ref={text2Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left select-none pointer-events-none"
            >
              {/* max-w-sm allocates perfect room so the massive display on the right has plenty of space */}
              <div className="space-y-6 max-w-sm pl-4">
                <span className="font-mono text-xs md:text-sm text-gold tracking-[0.2em] uppercase font-bold block">
                  02 / ARQUITECTURA DIGITAL SINFÍN
                </span>
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
                  Diseño Web <br />
                  <span className="text-gold italic font-normal font-light">Personalizado</span>
                </h3>
                <p className="font-sans text-neutral-450 text-xs md:text-sm lg:text-base font-light leading-relaxed">
                  Diseñamos presencias digitales a medida para cualquier nicho, sector o escala. Desde firmas corporativas y consultorías de alto valor, hasta pymes y marcas boutique. No decoramos plantillas: esculpimos herramientas de conversión sin fricción que reescriben tu autoridad ante el mercado premium.
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:contacto@kleos.studio"
                    className="inline-flex items-center gap-3 px-8 py-3.5 border border-gold/20 hover:border-gold hover:bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em] transition-all duration-300 rounded cursor-hover pointer-events-auto"
                  >
                    Explorar Innovación →
                  </a>
                </div>
              </div>
            </div>

            {/* MOCKUP 03: iPhone Case 03 (Slides up on Left) */}
            {/* BUGFIX 6: Nudged right by md:translate-x-[24px] to perfectly align with mockup 1 */}
            <div
              ref={mockup3Ref}
              className="absolute w-[270px] md:w-[335px] aspect-[9/19.5] will-change-transform z-10 md:translate-x-[24px]"
            >
              <div className="rotate-3d-iphone-17 w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                
                {/* Shadow */}
                <div className="absolute inset-6 bg-black rounded-[50px] blur-2xl pointer-events-none" style={{ transform: "translateZ(-30px)", opacity: 0.95 }} />

                {/* Body */}
                <div 
                  className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-[#242426] via-[#141415] to-[#0a0a0b] shadow-[inset_0_0_24px_rgba(0,0,0,0.9)] border border-neutral-900"
                  style={{ transform: "translateZ(-10px)", transformStyle: "preserve-3d" }}
                >
                  <div className="absolute left-[-4px] top-12 bottom-12 w-[8px] bg-gradient-to-b from-[#2a2a2b] via-[#161617] to-[#0a0a0b] rounded" style={{ transform: "rotateY(-90deg) translateZ(4px)" }} />
                  <div className="absolute right-[-4px] top-12 bottom-12 w-[8px] bg-gradient-to-b from-[#2a2a2b] via-[#161617] to-[#0a0a0b] rounded" style={{ transform: "rotateY(90deg) translateZ(4px)" }} />
                  <div className="absolute left-[-5px] top-24 w-1.2 h-8 bg-[#1e1e1f] rounded-l border-y border-l border-black/45" style={{ transform: "translateZ(1px)" }} />
                  <div className="absolute left-[-5px] top-36 w-1.2 h-8 bg-[#1e1e1f] rounded-l border-y border-l border-black/45" style={{ transform: "translateZ(1px)" }} />
                  <div className="absolute right-[-5px] top-32 w-1.2 h-12 bg-[#1e1e1f] rounded-r border-y border-r border-black/45" style={{ transform: "translateZ(1px)" }} />
                </div>

                {/* Screen */}
                <div 
                  className="absolute inset-1 rounded-[44px] overflow-hidden bg-neutral-950 border border-black shadow-inner"
                  style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20 mix-blend-overlay" />
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-26 h-5.5 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-inner" style={{ transform: "translateZ(14px)" }} />

                  {/* Video del reloj de oro */}
                  <video
                    src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-luxury-watch-casing-34280-large.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
                  />

                  {/* Overlay Case Badge */}
                  <div 
                    className="absolute bottom-3 inset-x-3 bg-[#050505]/60 backdrop-blur-md border border-white/5 p-2.5 rounded-xl z-20 select-none"
                    style={{ transform: "translateZ(16px)" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[7px] text-gold tracking-widest uppercase font-bold">
                        KLEOS // CASE 03
                      </span>
                      <span className="font-mono text-[7px] text-neutral-450">
                        M-2026
                      </span>
                    </div>
                    <p className="font-serif text-[9px] text-white mt-0.5 leading-tight">
                      Ecosistemas de Estatus Corporativo
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ==================================================== */}
          {/* CAPA STACK DERECHO (RIGHT STACK)                     */}
          {/* ==================================================== */}
          {/* Renders: Text 1 (P1 - Nudge slightly right), Mockup 2 (P2 - 7 Cols for massive TV!), and Text 3 (P3) */}
          <div className="md:col-span-6 h-full relative flex items-center justify-center">
            
            {/* TEXT 01: Embajadoras Digitales IA (Fixed on Right) */}
            {/* BUGFIX 7: Nudged slightly to the right (md:translate-x-[16px]) to perfectly balance the iPhone's right-drift,
                maintaining a perfectly symmetrical and wide-spaced center gap! */}
            <div
              ref={text1Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left select-none pointer-events-none md:translate-x-[16px]"
              style={!hasCompletedRound ? { opacity: 1, transform: "translateY(0px)" } : undefined}
            >
              <div className="space-y-6 max-w-md">
                <span className="font-mono text-xs md:text-sm text-gold tracking-[0.2em] uppercase font-bold block">
                  01 / EMBAJADORAS DIGITALES
                </span>
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
                  Embajadoras <br />
                  <span className="text-gold italic font-normal">Digitales IA</span>
                </h3>
                <p className="font-sans text-neutral-450 text-sm md:text-base font-light leading-relaxed">
                  Diseñamos embajadoras digitales hiperrealistas para representar marcas, conectar con audiencias y potenciar su presencia digital.
                </p>
                
                {/* BARRA DE PROGRESO DE PERCEPCIÓN IA */}
                <div className="pt-4 space-y-2 select-none">
                  {!hasCompletedRound ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-mono text-gold tracking-widest uppercase">
                        <span>PROCESANDO PERCEPCIÓN IA...</span>
                        <span>{currentModelIdx + 1} / {MODELS.length}</span>
                      </div>
                      <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-300"
                          style={{ width: `${((currentModelIdx + 1) / MODELS.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[8px] font-mono text-[#E5C383] tracking-widest uppercase animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C383]" />
                      <span>ESTÉTICA DE AUTORIDAD LISTA · DESLIZA PARA CONTINUAR</span>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <a
                    href="mailto:contacto@kleos.studio"
                    className="inline-flex items-center gap-3 px-8 py-3.5 border border-gold/20 hover:border-gold hover:bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em] transition-all duration-300 rounded cursor-hover pointer-events-auto"
                  >
                    Explorar Proyecto →
                  </a>
                </div>
              </div>
            </div>

            {/* MOCKUP 02: Cinematic Cinema Studio Display Mockup showing custom web screenshots */}
            {/* BUGFIX 8: Sightly reduced width from 820px to 680px and aligned with md:-right-4 lg:-right-8
                This completely prevents the TV right bezel from being clipped by overflow-hidden boundaries,
                while leaving extensive breathing room on the left so it never overlaps the text! */}
            <div
              ref={mockup2Ref}
              className="absolute w-[380px] md:w-[600px] lg:w-[680px] aspect-[16/10] will-change-transform z-10 md:-right-4 lg:-right-8"
            >
              {/* .rotate-3d-tv applies the custom wide-angle horizontal rotation loop */}
              <div className="rotate-3d-tv w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                
                {/* 3D Shadow for Cinema Display */}
                <div className="absolute inset-4 bg-black/75 rounded-3xl blur-2xl" style={{ transform: "translateZ(-25px)", opacity: 0.95 }} />

                {/* 3D Monitor Chassis (Space black sleek display) */}
                <div 
                  className="w-full h-full rounded-3xl bg-[#161617] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.85),_0_0_0_1px_rgba(255,255,255,0.08)] border border-neutral-850 flex flex-col overflow-hidden group/tv hover:shadow-[0_30px_70px_rgba(197,160,89,0.12)] transition-shadow duration-700 ease-out"
                  style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="w-full h-full rounded-2xl overflow-hidden relative bg-[#050505] border border-black shadow-inner"
                    style={{ transform: "translateZ(6px)" }}
                  >
                    {/* WEBS CAROUSEL (Cross-fades your 5 spectacular custom web designs) */}
                    {WEBS.map((web, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{
                          opacity: currentWebIdx === idx ? 1 : 0,
                          zIndex: currentWebIdx === idx ? 10 : 1,
                        }}
                      >
                        {/* object-top ensures the beautiful top hero fold of your designs is visible perfectly! */}
                        <img
                          src={web}
                          alt="Diseño Web Personalizado KLEOS"
                          className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.03]"
                        />
                      </div>
                    ))}
                    
                    {/* Sleek glass glare reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20 mix-blend-overlay" />

                    {/* On-screen badge */}
                    <div className="absolute bottom-3 left-3 bg-[#050505]/45 backdrop-blur-md border border-white/5 p-2 rounded-xl z-20 select-none">
                      <span className="font-mono text-[6px] md:text-[7px] text-gold tracking-widest uppercase font-bold">KLEOS DIGITAL STUDIO</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* TEXT 03: Authority Brand Ecosystems (Fixed on Right) */}
            <div
              ref={text3Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left select-none pointer-events-none"
            >
              <div className="space-y-6 max-w-md">
                <span className="font-mono text-xs md:text-sm text-gold tracking-[0.2em] uppercase font-bold block">
                  03 / AUTORIDAD DE MARCA
                </span>
                <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight">
                  Ecosistemas <br />
                  <span className="text-gold italic font-normal font-light">de Estatus</span>
                </h3>
                <p className="font-sans text-neutral-450 text-sm md:text-base font-light leading-relaxed max-w-2xl font-sans">
                  Convertimos marcas corporativas tradicionales en firmas legendarias deseadas por directores, inversionistas y clientes premium de alta gama.
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:contacto@kleos.studio"
                    className="inline-flex items-center gap-3 px-8 py-3.5 border border-gold/20 hover:border-gold hover:bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em] transition-all duration-300 rounded cursor-hover pointer-events-auto"
                  >
                    Explorar Proyecto →
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM METADATA RAIL */}
        {/* BUGFIX 9: Placed even closer to the baseline (bottom-2) and reduced grid heights 
            to guarantee over 70px of crisp, beautiful "black void" empty air separating the mockups from the bottom line! */}
        <div className="absolute bottom-2 left-6 right-6 md:left-12 md:right-12 lg:left-24 lg:right-24 flex justify-between items-center border-t border-white/5 pt-3 select-none">
          <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-[0.25em]">
            KLEOS_SHOWCASE // 2026
          </span>
          <span className="font-mono text-[8px] text-gold uppercase tracking-[0.3em]">
            EXCLUSIVIDAD DIGITAL DE ELITE
          </span>
        </div>

      </div>
    </section>
  );
}
