import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatementSectionProps {
  text: string;
  highlight: string;
  id?: string;
  className?: string;
  variant?: "parallax" | "deblur" | "window"; // Selector de modos de diseño
}

export default function StatementSection({
  text,
  highlight,
  id,
  className = "",
  variant = "parallax", // Por defecto inicia en parallax
}: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ─── PROPUESTA I: El Paneo Tridimensional (Parallax horizontal) ───────
      if (variant === "parallax" && textRef.current) {
        const line1 = textRef.current.querySelector(".statement-line-1");
        const line2 = textRef.current.querySelector(".statement-line-2");

        // Línea 1 se desplaza suavemente hacia la derecha con el scroll
        gsap.fromTo(
          line1,
          { x: "-8vw" },
          {
            x: "8vw",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        // Línea 2 se desplaza suavemente hacia la izquierda con el scroll
        gsap.fromTo(
          line2,
          { x: "8vw" },
          {
            x: "-8vw",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        // Animación suave de entrada vertical para ambas líneas (Bidireccional)
        gsap.fromTo(
          [line1, line2],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse", // Activo al subir y bajar
            },
          }
        );
      }

      // ─── PROPUESTA II: El Enfoque de Lente Gaseoso (De-blur palabra por palabra) ───
      if (variant === "deblur" && textRef.current) {
        const words = textRef.current.querySelectorAll(".deblur-word");

        gsap.fromTo(
          words,
          {
            opacity: 0,
            filter: "blur(24px)",
            scale: 1.08,
            y: 15,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            duration: 1.6,
            stagger: 0.08, // Transición de enfoque elástico palabra por palabra
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse", // Activo al subir y bajar
            },
          }
        );
      }

      // ─── PROPUESTA III: La Revelación bajo Sombra (Parallax vertical) ───
      if (variant === "window" && textRef.current) {
        // Desfase vertical (el texto viaja un poco más lento que el scroll)
        gsap.fromTo(
          textRef.current,
          { y: "-6vh" },
          {
            y: "6vh",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Suave entrada de escalado y opacidad (Bidireccional)
        gsap.fromTo(
          textRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse", // Activo al subir y bajar
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [variant]);

  // Utilidad para separar el texto en palabras con su color y tipografía original para la propuesta II
  const renderDeblurText = () => {
    const combinedText = `${text} ${highlight}`;
    const words = combinedText.split(" ");
    const firstPartWordCount = text.split(" ").length;

    return words.map((word, i) => {
      const isHighlight = i >= firstPartWordCount;
      return (
        <span
          key={i}
          className={`deblur-word inline-block mr-[0.25em] will-change-transform ${
            isHighlight ? "text-gold italic font-normal" : "text-neutral-100"
          }`}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-32 md:py-48 lg:py-64 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans flex items-center justify-center min-h-[75vh] ${className}`}
    >
      {/* Editorial Watermark Parallax de fondo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.008] text-[20vw] font-serif italic text-white leading-none whitespace-nowrap">
        Kleos
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center w-full">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight leading-[1.05] font-light w-full"
        >
          {/* RENDER DE PROPUESTA I */}
          {variant === "parallax" && (
            <div className="flex flex-col gap-6 overflow-hidden py-4 w-full">
              <span className="statement-line-1 block will-change-transform whitespace-nowrap">
                {text}
              </span>
              <span className="statement-line-2 block text-gold italic font-normal will-change-transform whitespace-nowrap">
                {highlight}
              </span>
            </div>
          )}

          {/* RENDER DE PROPUESTA II */}
          {variant === "deblur" && (
            <div className="flex flex-wrap justify-center py-4 max-w-5xl mx-auto leading-[1.1]">
              {renderDeblurText()}
            </div>
          )}

          {/* RENDER DE PROPUESTA III */}
          {variant === "window" && (
            <div className="py-4 max-w-5xl mx-auto leading-[1.1] will-change-transform select-none">
              {text} <br className="hidden sm:inline" />
              <span className="text-gold italic font-normal">{highlight}</span>
            </div>
          )}
        </h2>
      </div>
    </section>
  );
}
