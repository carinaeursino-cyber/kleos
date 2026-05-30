import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatementSectionProps {
  text: string;
  highlight: string;
  id?: string;
  className?: string;
}

export default function StatementSection({
  text,
  highlight,
  id,
  className = "",
}: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-32 md:py-48 lg:py-64 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans flex items-center justify-center min-h-[70vh] ${className}`}
    >
      {/* Watermark decorativo sutil */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.008] text-[20vw] font-serif italic text-white leading-none whitespace-nowrap">
        Kleos
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight leading-[0.95] text-neutral-100 font-light"
        >
          {text}{" "}
          <br className="hidden sm:inline" />
          <span className="text-gold italic font-normal">{highlight}</span>
        </h2>
      </div>
    </section>
  );
}
