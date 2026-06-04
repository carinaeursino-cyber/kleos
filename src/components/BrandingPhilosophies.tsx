import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─────────────────────────────────────────────────────────────────
// KleosIsotype
// Réplica pixel-perfect del isotipo del Slide 3 (LambdaCanvas.tsx).
// Mismos paths, strokeWidth, colores, filtros, keyframes y timing.
// La única diferencia: se activa por ScrollTrigger en lugar de
// la prop `isActive` del Hero.
// ─────────────────────────────────────────────────────────────────
function KleosIsotype() {
  const leftRef    = useRef<SVGPathElement>(null);
  const rightRef   = useRef<SVGPathElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const hasPlayed  = useRef(false);

  // Paths idénticos a LambdaCanvas.tsx
  const lambdaPath      = "M 80,442 L 112,442 L 250,62";
  const lambdaPathRight = "M 420,442 L 388,442 L 250,62";

  const triggerAnimation = () => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const left  = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    // Medir longitudes reales
    const lenLeft  = left.getTotalLength();
    const lenRight = right.getTotalLength();

    left.style.setProperty("--len-left",  String(lenLeft));
    left.style.strokeDasharray  = String(lenLeft);
    left.style.strokeDashoffset = String(lenLeft);

    right.style.setProperty("--len-right", String(lenRight));
    right.style.strokeDasharray  = String(lenRight);
    right.style.strokeDashoffset = String(lenRight);

    // Forzar reflow para que CSS tome los valores
    void left.getBoundingClientRect();
    void right.getBoundingClientRect();

    // Draw-on — exactamente igual que en LambdaCanvas
    left.style.animation  = "lc-draw-left  2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards";
    right.style.animation = "lc-draw-right 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards";

    // Anillo exterior — mismo delay que el original
    if (ringRef.current) {
      ringRef.current.style.animation = "lc-ring-in 0.8s ease forwards 3.2s";
    }

    // Logotipo "K·L·E·O·S" — mismo timing
    if (logoRef.current) {
      logoRef.current.style.animation =
        "lc-logo-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 3.2s forwards";
    }

    // Glow-pulse idle — arranca tras el draw (misma animación CSS)
    if (svgRef.current) {
      svgRef.current.style.animation = "lc-glow-pulse 3.6s ease-in-out infinite 3.5s";
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Activar cuando el isotipo entra en viewport
    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top 82%",
      onEnter: triggerAnimation,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        display:  "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        width:  "100%",
        height: "100%",
      }}
    >
      {/* ── Keyframes — copiados 1:1 de LambdaCanvas ── */}
      <style>{`
        @keyframes lc-ring-in {
          to { opacity: 1; }
        }
        @keyframes lc-draw-left {
          from { stroke-dashoffset: var(--len-left); }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes lc-draw-right {
          from { stroke-dashoffset: var(--len-right); }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes lc-spark-in {
          0%   { opacity: 0; r: 2;  }
          40%  { opacity: 1; r: 8;  }
          100% { opacity: 0; r: 14; }
        }
        @keyframes lc-glow-pulse {
          0%, 100% {
            filter:
              drop-shadow(0 0  6px rgba(212,175,55,0.85))
              drop-shadow(0 0 18px rgba(212,175,55,0.50))
              drop-shadow(0 0 40px rgba(212,175,55,0.22));
          }
          50% {
            filter:
              drop-shadow(0 0 10px rgba(212,175,55,1.00))
              drop-shadow(0 0 28px rgba(212,175,55,0.70))
              drop-shadow(0 0 60px rgba(212,175,55,0.35));
          }
        }
        @keyframes lc-logo-reveal {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Wrapper del SVG con halo y anillos ── */}
      <div
        style={{
          position: "relative",
          width:    "100%",
          height:   "100%",
          display:  "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Halo radial dorado — idéntico al original */}
        <div
          style={{
            position:      "absolute",
            width:         "520px",
            height:        "520px",
            borderRadius:  "50%",
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)",
          }}
        />

        {/* Anillos decorativos — idénticos al original */}
        <div
          ref={ringRef}
          style={{
            position:     "absolute",
            inset:        "-18px",
            borderRadius: "50%",
            border:       "1px solid rgba(212,175,55,0.15)",
            opacity:      0,
          }}
        >
          <div
            style={{
              position:     "absolute",
              inset:        "12px",
              borderRadius: "50%",
              border:       "1px solid rgba(212,175,55,0.08)",
            }}
          />
        </div>

        {/* ── SVG Lambda — idéntico al LambdaCanvas slide 3 ── */}
        <svg
          ref={svgRef}
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Lambda isotipo KLEOS"
          style={{
            width:    "100%",
            height:   "100%",
            overflow: "visible",
            // Glow inicial (antes del pulse)
            filter: [
              "drop-shadow(0 0  6px rgba(212,175,55,0.90))",
              "drop-shadow(0 0 18px rgba(212,175,55,0.55))",
              "drop-shadow(0 0 40px rgba(212,175,55,0.25))",
            ].join(" "),
          }}
        >
          <defs>
            {/* Filtro inner-glow — copiado exacto de LambdaCanvas */}
            <filter id="lc-inner-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0.85 0    0 0
                        0 0.68 0    0 0
                        0 0    0.21 0 0
                        0 0    0    3 -1"
                result="colored"
              />
              <feComposite in="colored" in2="SourceGraphic" operator="over" />
            </filter>
          </defs>

          {/* Pierna izquierda */}
          <path
            ref={leftRef}
            d={lambdaPath}
            fill="none"
            stroke="#C5A059"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lc-inner-glow)"
          />

          {/* Pierna derecha */}
          <path
            ref={rightRef}
            d={lambdaPathRight}
            fill="none"
            stroke="#C5A059"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lc-inner-glow)"
          />

          {/* Chispa en el apex al terminar el draw */}
          <circle
            cx="250"
            cy="62"
            r="0"
            fill="none"
            stroke="#E5C383"
            strokeWidth="2"
            style={{
              opacity:   0,
              animation: "lc-spark-in 0.6s ease-out forwards 3.05s",
            }}
          />
        </svg>
      </div>

      {/* ── K·L·E·O·S — aparece tras el draw, idéntico al slide 3 ── */}
      <div
        ref={logoRef}
        style={{
          display:    "flex",
          alignItems: "baseline",
          gap:        "3px",
          userSelect: "none",
          opacity:    0,
        }}
      >
        <span
          style={{
            fontFamily:    "Playfair Display, Georgia, serif",
            fontSize:      "clamp(1.1rem, 1.8vw, 1.5rem)",
            letterSpacing: "0.15em",
            color:         "#C5A059",
            fontWeight:    300,
          }}
        >
          K
        </span>
        <span
          style={{
            fontFamily:    "Playfair Display, Georgia, serif",
            fontSize:      "clamp(1.1rem, 1.8vw, 1.5rem)",
            letterSpacing: "0.15em",
            color:         "rgba(255,255,255,0.40)",
            fontWeight:    300,
          }}
        >
          ·L·E·O·S
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────

// Layout: texto a la izquierda · isotipo a la derecha
// ─────────────────────────────────────────────────────────────────
export default function BrandingPhilosophies() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const quoteRef    = useRef<HTMLParagraphElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const emphasisRef = useRef<HTMLParagraphElement>(null);
  const isotopeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        opacity: 0, y: 12, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(quoteRef.current, {
        opacity: 0, y: 36, duration: 1.4, ease: "power3.out", delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(dividerRef.current, {
        scaleX: 0, opacity: 0, transformOrigin: "left center",
        duration: 1.0, ease: "power3.out", delay: 0.28,
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(emphasisRef.current, {
        opacity: 0, y: 24, duration: 1.2, ease: "power3.out", delay: 0.42,
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 74%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(isotopeRef.current, {
        opacity: 0, x: 28, duration: 1.8, ease: "power3.out", delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 78%",
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
      style={{
        position: "relative",
        width:    "100%",
        background: "#050505",
        overflow: "hidden",
        padding:  "10vw 8vw 12vw",
      }}
    >
      {/* Ambient glow sutil del lado derecho */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 60% at 74% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Grid principal ── */}
      <div
        style={{
          position:       "relative",
          zIndex:         10,
          maxWidth:       "1280px",
          margin:         "0 auto",
          width:          "100%",
          display:        "flex",
          flexDirection:  "row",
          alignItems:     "center",
          gap:            0,
        }}
      >
        {/* ══ COLUMNA IZQUIERDA — Texto ══ */}
        <div
          style={{
            flex:          1,
            display:       "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth:      "52%",
          }}
        >
          <span
            ref={labelRef}
            style={{
              fontFamily:    "JetBrains Mono, monospace",
              fontSize:      "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "rgba(197,160,89,0.45)",
              display:       "block",
              marginBottom:  "2.8rem",
            }}
          >
            03 — Axiomas
          </span>

          <p
            ref={quoteRef}
            style={{
              fontFamily:    "Playfair Display, Georgia, serif",
              fontSize:      "clamp(1.5rem, 2.5vw, 2.25rem)",
              fontWeight:    400,
              lineHeight:    1.22,
              letterSpacing: "-0.01em",
              color:         "rgba(245,245,245,0.92)",
            }}
          >
            No se trata de verse bien.
            <br />
            Se trata de ser percibido
            <br />
            <em style={{ color: "#C5A059", fontStyle: "italic" }}>
              correctamente.
            </em>
          </p>

          <div
            ref={dividerRef}
            style={{
              width:      "3rem",
              height:     "1px",
              background: "linear-gradient(90deg, #C5A059 0%, transparent 100%)",
              margin:     "2.8rem 0",
              opacity:    0.55,
            }}
          />

          <p
            ref={emphasisRef}
            style={{
              fontFamily:    "Inter, system-ui, sans-serif",
              fontSize:      "clamp(0.82rem, 1.1vw, 1rem)",
              letterSpacing: "0.02em",
              lineHeight:    1.7,
              color:         "rgba(245,245,245,0.38)",
            }}
          >
            <span style={{ color: "rgba(245,245,245,0.68)", fontWeight: 500 }}>
              El diseño no es decoración.
            </span>
            <br />
            Es una herramienta de posicionamiento.
          </p>
        </div>

        {/* ══ COLUMNA DERECHA — Isotipo ══ */}
        <div
          ref={isotopeRef}
          style={{
            flexShrink:     0,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          "clamp(200px, 26vw, 360px)",
            height:         "clamp(200px, 26vw, 360px)",
            marginLeft:     "auto",
            paddingLeft:    "3vw",
          }}
        >
          <KleosIsotype />
        </div>
      </div>
    </section>
  );
}
