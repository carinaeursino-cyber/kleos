import { useRef, useEffect } from "react";
import bearVideo from "../../assets/videos/bear.webm";

interface BearVideoProps {
  isActive?: boolean;
  onTimeUpdate?: (time: number) => void;
  onEnded?: () => void;
}

export default function BearVideo({
  isActive = false,
  onTimeUpdate,
  onEnded,
}: BearVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
  ref={videoRef}
  className="absolute inset-0 w-full h-full object-cover object-[50%_0%] sm:object-[50%_60%]"
  src={bearVideo}
  muted
  playsInline
  preload="auto"
  onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime)}
  onEnded={() => onEnded?.()}
/>
    </div>
  );
}
