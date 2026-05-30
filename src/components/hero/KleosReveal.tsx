import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

interface KleosRevealProps {
  currentTime: number;
}

export default function KleosReveal({ currentTime }: KleosRevealProps) {
  const isRevealed = currentTime >= 2.6;
  const glowRef = useRef<HTMLDivElement>(null);

  // Trigger high-end GSAP glow expansion at peak trigger moments
  useEffect(() => {
    if (!glowRef.current) return;

    if (currentTime >= 2.6 && currentTime <= 4.0) {
      const progress = (currentTime - 2.6) / 1.4; // 0 to 1
      gsap.to(glowRef.current, {
        opacity: 0.8 * (1 - progress * 0.4), // peak at 0.8, then settle
        scale: 1 + progress * 0.15,
        filter: `blur(${40 - progress * 10}px)`,
        duration: 0.4,
        ease: "power2.out"
      });
    } else if (currentTime > 4.0) {
      gsap.to(glowRef.current, {
        opacity: 0.4,
        scale: 1.1,
        filter: "blur(30px)",
        duration: 0.5,
        ease: "power1.out"
      });
    } else {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 0.7,
        duration: 0.2
      });
    }
  }, [currentTime]);

  const chars = "KLEOS".split("");

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Editorial Background Golden Symmetrical Halo */}
      <div
        ref={glowRef}
        className="absolute w-[280px] h-[100px] md:w-[450px] md:h-[160px] bg-gold/15 rounded-full filter blur-[32px] mix-blend-screen opacity-0 scale-75 pointer-events-none"
      />

      {/* Symmetrical framing lines */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute -top-6 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          />
        )}
      </AnimatePresence>

      <h1 className="text-6xl sm:text-7xl md:text-9xl tracking-[0.3em] pl-[0.3em] font-serif font-light text-white relative transition-all duration-75">
        {isRevealed ? (
          <span className="flex items-center justify-center">
            {chars.map((char, index) => {
              // Custom responsive entry params for each letter
              const delay = index * 0.08;
              const isAccent = index === 2; // "E" serves as our asymmetric editorial anchor

              return (
                <motion.span
                  key={index}
                  initial={{
                    opacity: 0,
                    filter: "blur(20px)",
                    y: 20,
                    scale: 0.85
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: 1.2,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`inline-block relative select-none ${
                    isAccent ? "text-gold font-medium" : "text-white"
                  }`}
                  style={{
                    textShadow: isAccent
                      ? "0 0 45px rgba(197, 160, 89, 0.35)"
                      : "0 0 30px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ) : (
          <span className="opacity-0 select-none pointer-events-none">KLEOS</span>
        )}
      </h1>
    </div>
  );
}
