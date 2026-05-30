import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandingPhilosophies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      gsap.from(sublineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy-section"
      className="relative py-32 md:py-48 lg:py-64 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans flex items-center justify-center min-h-[80vh]"
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/5 via-[#050505] to-[#050505] pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Primary Philosophy Statement */}
        <h2
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight text-neutral-100 leading-[0.95] font-light"
        >
          “No se trata de verse bien. <br className="hidden md:inline" />
          <span className="text-gold italic font-normal">
            Se trata de ser percibido correctamente.”
          </span>
        </h2>

        {/* Separation */}
        <div className="flex items-center justify-center gap-4 py-10 md:py-14">
          <div className="w-16 md:w-24 h-px bg-white/10" />
          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          <div className="w-16 md:w-24 h-px bg-white/10" />
        </div>

        {/* Secondary Statement */}
        <p
          ref={sublineRef}
          className="text-lg md:text-xl lg:text-2xl font-mono text-neutral-400 font-light tracking-wide max-w-2xl leading-relaxed"
        >
          “El diseño no es decoración.”
        </p>
        <p
          ref={badgeRef}
          className="mt-4 text-[11px] md:text-xs font-mono tracking-[0.3em] text-gold uppercase font-semibold"
        >
          Es una herramienta de posicionamiento.
        </p>
      </div>
    </section>
  );
}
