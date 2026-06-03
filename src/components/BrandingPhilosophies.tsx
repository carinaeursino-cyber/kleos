import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandingPhilosophies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 90,
        opacity: 0,
        duration: 1.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(sublineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.42,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(prismRef.current, {
        x: 80,
        opacity: 0,
        scale: 0.92,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2,
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
      className="relative py-28 md:py-40 lg:py-52 bg-[#050505] text-white border-t border-white/10 overflow-hidden font-sans min-h-screen flex items-center"
    >
      <style>{`
        @keyframes prismFloat {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }

        @keyframes prismBreath {
          0%, 100% { opacity: 0.34; transform: scale(0.96); }
          50% { opacity: 0.72; transform: scale(1.04); }
        }

        @keyframes prismRay {
          0% { stroke-dashoffset: 760; opacity: 0; }
          16% { opacity: 1; }
          72% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes prismSpark {
          0%, 100% { opacity: 0.18; transform: translateY(0px) scale(0.9); }
          50% { opacity: 0.8; transform: translateY(-8px) scale(1.05); }
        }

        .perception-prism {
          animation: prismFloat 8s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .perception-prism-halo {
          animation: prismBreath 5.5s ease-in-out infinite;
          transform-origin: center;
        }

        .perception-ray {
          stroke-dasharray: 760;
          stroke-dashoffset: 760;
          animation: prismRay 5.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .perception-spark {
          animation: prismSpark 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[620px] h-[620px] bg-gold/[0.018] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(197,160,89,0.08),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(181,106,53,0.08),transparent_34%),linear-gradient(180deg,#050505,#030304)] pointer-events-none select-none" />
      <div className="absolute right-[-6vw] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.018] text-[23vw] font-serif italic text-white leading-none whitespace-nowrap">
        Axioma
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="w-full flex items-center gap-4 mb-16 md:mb-20 select-none">
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-gold uppercase whitespace-nowrap">
            Axioma de posicionamiento
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/15 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <h2
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-tight text-neutral-100 leading-[1.02] font-light"
            >
              No se trata de verse bien. <br className="hidden md:inline" />
              <span className="text-gold italic font-normal">
                Se trata de ser percibido correctamente.
              </span>
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-4 py-10 md:py-12">
              <div className="w-16 md:w-24 h-px bg-white/10" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_16px_rgba(197,160,89,0.7)]" />
              <div className="w-16 md:w-24 h-px bg-white/10" />
            </div>

            <p
              ref={sublineRef}
              className="text-base md:text-lg lg:text-xl font-mono text-neutral-400 font-light tracking-wide max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              El diseño no es decoración.
            </p>
            <p
              ref={badgeRef}
              className="mt-4 text-[11px] md:text-xs font-mono tracking-[0.3em] text-gold uppercase font-semibold"
            >
              Es una herramienta de posicionamiento.
            </p>
          </div>

          <div
            ref={prismRef}
            className="lg:col-span-5 relative h-[360px] md:h-[430px] flex items-center justify-center select-none"
          >
            <div className="absolute inset-0 perception-prism-halo bg-[radial-gradient(circle_at_center,rgba(229,195,131,0.18),rgba(181,106,53,0.08)_32%,transparent_62%)] blur-2xl" />

            <svg
              className="relative w-full max-w-[460px] h-full overflow-visible"
              viewBox="0 0 520 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="prismGold" x1="170" y1="72" x2="360" y2="380" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFF4D8" stopOpacity="0.95" />
                  <stop offset="0.35" stopColor="#E5C383" stopOpacity="0.76" />
                  <stop offset="0.68" stopColor="#B56A35" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#050505" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="rayGold" x1="0" y1="0" x2="520" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C5A059" stopOpacity="0" />
                  <stop offset="0.28" stopColor="#E5C383" stopOpacity="0.8" />
                  <stop offset="0.5" stopColor="#FFF4D8" stopOpacity="1" />
                  <stop offset="0.72" stopColor="#B56A35" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#C5A059" stopOpacity="0" />
                </linearGradient>
                <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                className="perception-ray"
                d="M 12 242 C 110 230 145 216 207 213 C 252 210 286 220 318 237 C 365 262 407 270 506 250"
                stroke="url(#rayGold)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#softGlow)"
              />
              <path
                d="M 20 278 C 110 262 164 250 220 250 C 266 250 304 264 342 288 C 385 315 430 326 506 310"
                stroke="rgba(197,160,89,0.14)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              <g className="perception-prism" filter="url(#softGlow)">
                <path
                  d="M260 65 L374 164 L338 334 L260 397 L182 334 L146 164 Z"
                  fill="rgba(5,5,5,0.58)"
                  stroke="url(#prismGold)"
                  strokeWidth="1.5"
                />
                <path
                  d="M260 65 L260 397"
                  stroke="rgba(229,195,131,0.28)"
                  strokeWidth="1"
                />
                <path
                  d="M146 164 L338 334"
                  stroke="rgba(255,244,216,0.12)"
                  strokeWidth="1"
                />
                <path
                  d="M374 164 L182 334"
                  stroke="rgba(255,244,216,0.12)"
                  strokeWidth="1"
                />
                <path
                  d="M260 65 L338 334 L260 397 L182 334 Z"
                  fill="url(#prismGold)"
                  opacity="0.08"
                />
                <circle cx="260" cy="228" r="5" fill="#E5C383" opacity="0.85" />
                <circle cx="260" cy="228" r="28" stroke="rgba(229,195,131,0.12)" />
              </g>

              {[
                [110, 125, 0],
                [420, 130, 0.4],
                [398, 365, 0.8],
                [126, 340, 1.2],
                [300, 112, 1.6],
              ].map(([cx, cy, delay], idx) => (
                <circle
                  key={idx}
                  className="perception-spark"
                  cx={cx}
                  cy={cy}
                  r="2.2"
                  fill="#E5C383"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}

              <text x="92" y="418" fill="rgba(197,160,89,0.6)" fontSize="8" letterSpacing="3" fontFamily="monospace">
                VECTOR DE PERCEPCIÓN // 04
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-16 md:mt-20 w-full flex justify-between items-center border-t border-white/5 pt-3 select-none">
          <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-[0.25em]">
            KLEOS STUDIO
          </span>
          <span className="font-mono text-[8px] text-gold uppercase tracking-[0.3em] text-right">
            VECTOR DE PERCEPCIÓN
          </span>
        </div>
      </div>
    </section>
  );
}
