import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData } from "../data";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

      // ── List items stagger reveal ──
      if (listRef.current) {
        const items = listRef.current.querySelectorAll(".service-item");
        gsap.from(items, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative py-32 md:py-48 lg:py-64 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans"
    >
      {/* Decorative watermark — CON PARALLAX */}
      <div
        ref={watermarkRef}
        className="absolute left-[-5vw] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015] text-[30vw] font-serif italic text-white leading-none whitespace-nowrap will-change-transform"
      >
        Disciplinas
      </div>

      {/* Subtle ambient gold glow que se expande con hover de la lista */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.008] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* ================= HEADLINE OVERSIZED ================= */}
        <div className="mb-24 md:mb-40">
          <h2
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif tracking-tight leading-[0.85] text-neutral-100 font-light max-w-5xl"
          >
            Disciplinas de{" "}
            <span className="text-gold italic">Posicionamiento.</span>
          </h2>
        </div>

        {/* ================= LISTA EDITORIAL — LÍNEA DORADA EXPANDIBLE ================= */}
        <div ref={listRef} className="border-t border-white/10">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="service-item group border-b border-white/10 py-8 md:py-10 flex items-start gap-6 md:gap-10 cursor-default hover:bg-white/[0.02] transition-colors duration-500 px-4 -mx-4 relative overflow-hidden cursor-hover"
            >
              {/* Línea dorada expandible desde la izquierda al hover */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-gold/50 w-0 group-hover:w-full transition-all duration-700 ease-out" />
              {/* Barra vertical dorada sutil */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold/0 group-hover:bg-gold/40 transition-colors duration-500" />

              {/* Número grande */}
              <span className="font-mono text-3xl md:text-4xl lg:text-5xl font-black text-gold/10 group-hover:text-gold/30 transition-colors duration-500 shrink-0 w-16 md:w-24 text-right leading-none pt-1">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-neutral-100 font-light tracking-tight group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase shrink-0 group-hover:text-gold/60 transition-colors duration-300">
                    {service.subtitle}
                  </span>
                </div>
                <p className="mt-3 text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
