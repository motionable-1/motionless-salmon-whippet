import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface NordVPNLogoProps {
  startFrom?: number;
  size?: number;
  showText?: boolean;
}

export const NordVPNLogo: React.FC<NordVPNLogoProps> = ({
  startFrom = 0,
  size = 200,
  showText = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrom);

  // Mountain icon animation
  const mountainScale = spring({
    frame: f,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const mountainY = interpolate(
    spring({ frame: f, fps, config: { damping: 15, stiffness: 80 } }),
    [0, 1],
    [30, 0]
  );

  // Text reveal
  const textOpacity = interpolate(f, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textX = interpolate(f, [15, 35], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="flex items-center gap-4"
      style={{ transform: `scale(${size / 200})` }}
    >
      {/* Mountain Icon */}
      <div
        style={{
          transform: `scale(${mountainScale}) translateY(${mountainY}px)`,
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.196 32C1.792 28.564.5 24.403.5 20.161.5 9.021 9.184 0 19.885 0c10.7 0 19.385 9.02 19.385 20.161 0 4.242-1.293 8.403-3.697 11.839L26.27 16.268l-.905 1.584.905 4.403-6.384-11.382-3.955 6.953.93 4.429-3.36-5.96L4.197 32z"
            fill="#3E5FFF"
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div
          className="text-white font-bold text-4xl tracking-tight"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Nord<span style={{ color: "#3E5FFF" }}>VPN</span>
        </div>
      )}
    </div>
  );
};
