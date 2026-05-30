import { useEffect, useRef } from "react";

export default function LambdaMotion() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".lambda-trazo");
    paths?.forEach((p) => {
      const el = p as SVGPathElement;
      el.style.animation = "none";
      void el.offsetHeight;
      el.style.animation = "";
    });
  }, []);

  const lambdaPath = "M 28 85 L 36 85 L 50 15 L 64 85 L 72 85";

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldStroke" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="40%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#E5C383" />
          </linearGradient>

          <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feBlend in="SourceGraphic" in2="glow" mode="screen" />
          </filter>

          <filter id="softBloom">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          @keyframes laserDraw {
            0% { stroke-dashoffset: 240; opacity: 0.3; }
            15% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes coreShine {
            0% { stroke-dashoffset: 240; opacity: 0; }
            20% { opacity: 0.8; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes afterglow {
            0%, 100% { filter: drop-shadow(0 0 4px rgba(197,160,89,0.25)); }
            50% { filter: drop-shadow(0 0 10px rgba(229,195,131,0.45)); }
          }
          @keyframes apexPulse {
            0%, 100% { opacity: 0.4; r: 1; }
            50% { opacity: 0.9; r: 1.8; }
          }
          .lambda-trazo {
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
            animation: laserDraw 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards,
                       afterglow 4s ease-in-out 3s infinite;
          }
          .lambda-core {
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
            animation: coreShine 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards;
          }
          .apex-light {
            animation: apexPulse 3s ease-in-out 3s infinite;
          }
        `}</style>

        <g filter="url(#laserGlow)" transform="translate(0, 2)">
          <path
            d={lambdaPath}
            fill="none"
            stroke="url(#goldStroke)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lambda-trazo"
            opacity="0.9"
          />
          <path
            d={lambdaPath}
            fill="none"
            stroke="#E5C383"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lambda-core"
            filter="url(#softBloom)"
          />
        </g>

        <circle
          cx="50"
          cy="17"
          r="1.5"
          fill="#E5C383"
          className="apex-light"
          opacity="0"
          style={{ animationDelay: "2.8s" }}
          filter="url(#softBloom)"
        />
      </svg>
    </div>
  );
}
