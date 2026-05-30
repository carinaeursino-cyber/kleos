import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processStages } from "../data";
import { Compass, Sliders, Layers, Trophy } from "lucide-react";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cierreRef = useRef<HTMLDivElement>(null);

  const icons = [
    <Compass className="w-5 h-5 text-gold" key="compass" />,
    <Sliders className="w-5 h-5 text-gold" key="sliders" />,
    <Layers className="w-5 h-5 text-gold" key="layers" />,
    <Trophy className="w-5 h-5 text-gold" key="trophy" />,
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Header reveal ──
      if (headerRef.current) {
        const children = headerRef.current.children;
        gsap.from(children, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // ── Cards stagger reveal ──
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".process-card");
        gsap.from(cards, {
          y: 70,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // ── Cierre reveal ──
      gsap.from(cierreRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cierreRef.current,
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
      id="process-section"
      className="relative py-32 md:py-48 lg:py-64 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans"
    >
      {/* Editorial Decorative grid lines */}
      <div className="absolute top-0 bottom-0 left-1/4 -ml-px w-px bg-gradient-to-b from-neutral-900 via-neutral-950 to-transparent select-none pointer-events-none hidden xl:block" />
      <div className="absolute top-0 bottom-0 left-3/4 -ml-px w-px bg-gradient-to-b from-neutral-900 via-neutral-950 to-transparent select-none pointer-events-none hidden xl:block" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* ================= HEADER — OVERSIZED ================= */}
        <div
          ref={headerRef}
          className="max-w-4xl mx-auto text-center mb-32 md:mb-48"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[0.9] text-neutral-100 mb-10 font-light">
            El Proceso de{" "}
            <span className="text-gold italic">Posicionamiento.</span>
          </h2>
          <div className="h-0.5 w-16 bg-gold/30 mx-auto" />
        </div>

        {/* ================= 4 PROCESS STAGES — TITULARES GRANDES ================= */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processStages.map((stage, idx) => (
            <div
              key={idx}
              className="process-card relative flex flex-col justify-between bg-[#0B0B0C] border border-white/10 hover:border-gold/30 transition-all p-8 rounded-xl h-full shadow-lg group"
            >
              <div>
                {/* Visual Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <span className="font-mono text-2xl font-black text-gold/30 group-hover:text-gold/80 transition-colors duration-300">
                    {stage.step}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                    {stage.duration}
                  </span>
                </div>

                {/* Conceptual Icon */}
                <div className="w-10 h-10 rounded-md bg-neutral-950 border border-white/5 flex items-center justify-center mb-6 group-hover:border-gold/30 transition-colors">
                  {icons[idx]}
                </div>

                {/* Stage Title — AHORA GRANDE */}
                <h3 className="text-2xl md:text-3xl font-serif text-neutral-100 mb-3 tracking-tight leading-tight group-hover:text-gold transition-colors duration-300">
                  {stage.title}
                </h3>

                <span className="inline-block rounded text-gold text-[9px] font-mono tracking-widest uppercase font-bold mb-4">
                  {stage.concept}
                </span>

                {/* Description */}
                <p className="text-neutral-450 text-xs md:text-sm leading-relaxed font-light font-sans pt-3 border-t border-white/5 mt-3">
                  {stage.description}
                </p>
              </div>

              {/* Watermark identifier */}
              <div className="pt-6 mt-6 border-t border-white/5 text-right">
                <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-wider">
                  SYSTEM_STAGE // 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CIERRE / POSICIONAMIENTO BANNER ================= */}
        <div
          ref={cierreRef}
          className="mt-32 md:mt-48 max-w-5xl mx-auto text-center border border-white/10 bg-gradient-to-b from-[#0B0B0C] to-[#040405] rounded-2xl p-12 md:p-20 lg:p-28 relative overflow-hidden"
        >
          {/* Subtle gold center blur point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase font-bold block">
              POSICIONAMIENTO DEFINITIVO
            </span>
            <div className="w-16 h-px bg-gold/40 mx-auto" />

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-white tracking-tight max-w-3xl mx-auto font-light">
              “Tu negocio ya tiene valor. <br className="hidden sm:inline" />
              <span className="text-gold italic font-normal">
                Ahora necesita ser percibido a ese nivel.
              </span>
              ”
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
