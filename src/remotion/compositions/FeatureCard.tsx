import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { Glow } from "../library/components/effects/Glow";

interface FeatureCardProps {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  iconUrl: string;
  startFrom?: number;
  accentColor?: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  stat,
  statLabel,
  iconUrl,
  startFrom = 0,
  accentColor = "#3E5FFF",
  index = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrom);

  // Staggered entrance
  const delay = index * 6;
  const staggeredFrame = Math.max(0, f - delay);

  // Card scale and opacity
  const cardScale = spring({
    frame: staggeredFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardY = interpolate(
    spring({ frame: staggeredFrame, fps, config: { damping: 15, stiffness: 80 } }),
    [0, 1],
    [60, 0]
  );

  const cardOpacity = interpolate(staggeredFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Icon animation
  const iconScale = spring({
    frame: Math.max(0, staggeredFrame - 10),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Stat counter animation
  const statProgress = interpolate(staggeredFrame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Parse stat for animation (handle numbers with + or k suffix)
  const numericStat = parseFloat(stat.replace(/[^0-9.]/g, ""));
  const statSuffix = stat.replace(/[0-9.]/g, "");
  const animatedStat = Math.round(numericStat * statProgress);

  // Glow pulse
  const glowIntensity = 15 + Math.sin(frame / 20) * 5;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale}) translateY(${cardY}px)`,
      }}
    >
      <Glow color={accentColor} intensity={glowIntensity} layers={2}>
        <div
          className="relative overflow-hidden rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            border: `1px solid ${accentColor}30`,
            backdropFilter: "blur(20px)",
            width: 380,
          }}
        >
          {/* Accent line at top */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            }}
          />

          {/* Icon */}
          <div
            className="mb-6 flex items-center justify-center w-16 h-16 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${accentColor}30 0%, ${accentColor}10 100%)`,
              border: `1px solid ${accentColor}40`,
              transform: `scale(${iconScale})`,
            }}
          >
            <Img
              src={iconUrl}
              style={{ width: 32, height: 32 }}
            />
          </div>

          {/* Title */}
          <h3
            className="text-white font-bold text-2xl mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-white/60 text-base mb-6 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {description}
          </p>

          {/* Stat */}
          <div className="flex items-baseline gap-2">
            <span
              className="font-bold text-4xl"
              style={{
                color: accentColor,
                fontFamily: "Inter, sans-serif",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {animatedStat}{statSuffix}
            </span>
            <span
              className="text-white/50 text-sm uppercase tracking-wider"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {statLabel}
            </span>
          </div>

          {/* Corner accent */}
          <div
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            }}
          />
        </div>
      </Glow>
    </div>
  );
};

// Simpler icon badge for feature highlights
interface FeatureIconProps {
  iconUrl: string;
  label: string;
  startFrom?: number;
  delay?: number;
  color?: string;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({
  iconUrl,
  label,
  startFrom = 0,
  delay = 0,
  color = "#3E5FFF",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrom - delay);

  const scale = spring({
    frame: f,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const opacity = interpolate(f, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(
    spring({ frame: f, fps, config: { damping: 12, stiffness: 80 } }),
    [0, 1],
    [30, 0]
  );

  return (
    <div
      className="flex flex-col items-center gap-3"
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
      }}
    >
      <Glow color={color} intensity={20} layers={2}>
        <div
          className="flex items-center justify-center w-20 h-20 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, ${color}15 100%)`,
            border: `1px solid ${color}50`,
          }}
        >
          <Img src={iconUrl} style={{ width: 40, height: 40 }} />
        </div>
      </Glow>
      <span
        className="text-white/80 text-sm font-medium text-center"
        style={{ fontFamily: "Inter, sans-serif", maxWidth: 100 }}
      >
        {label}
      </span>
    </div>
  );
};
