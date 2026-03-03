import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface CyberBackgroundProps {
  variant?: "dark" | "gradient";
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({
  variant = "dark",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle grid animation
  const gridOffset = (frame / fps) * 20;

  // Floating orbs animation
  const orb1Y = Math.sin(frame / 60) * 30;
  const orb2Y = Math.cos(frame / 50) * 25;
  const orb3Y = Math.sin(frame / 40 + 1) * 20;

  // Pulse effect for orbs
  const pulse = 0.8 + Math.sin(frame / 30) * 0.2;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#141415" }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: variant === "gradient"
            ? "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(62, 95, 255, 0.15) 0%, transparent 60%)"
            : "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(62, 95, 255, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Animated cyber grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(62, 95, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(62, 95, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: `0 ${gridOffset}px`,
        }}
      />

      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(62, 95, 255, 0.02) 2px, rgba(62, 95, 255, 0.02) 4px)",
        }}
      />

      {/* Floating orbs - blue accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          left: "10%",
          top: "20%",
          background: "radial-gradient(circle, rgba(62, 95, 255, 0.2) 0%, transparent 70%)",
          transform: `translateY(${orb1Y}px) scale(${pulse})`,
          filter: "blur(60px)",
        }}
      />

      {/* Red accent orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          right: "5%",
          top: "60%",
          background: "radial-gradient(circle, rgba(224, 47, 31, 0.15) 0%, transparent 70%)",
          transform: `translateY(${orb2Y}px)`,
          filter: "blur(80px)",
        }}
      />

      {/* Secondary blue glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          left: "60%",
          top: "10%",
          background: "radial-gradient(circle, rgba(62, 95, 255, 0.12) 0%, transparent 70%)",
          transform: `translateY(${orb3Y}px)`,
          filter: "blur(50px)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

    </div>
  );
};

// Animated particles for cyber effect
export const CyberParticles: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig(); // For context

  const particles = Array.from({ length: 30 }).map((_, i) => {
    const seed = i * 1337;
    const x = ((seed * 7) % 100);
    const baseY = ((seed * 13) % 100);
    const size = 1 + (seed % 3);
    const speed = 0.3 + (seed % 10) / 20;
    const delay = (seed % 60);

    const y = (baseY + ((frame - delay) * speed)) % 120 - 10;
    const opacity = interpolate(y, [-10, 10, 90, 110], [0, 0.6, 0.6, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          left: `${x}%`,
          top: `${y}%`,
          backgroundColor: i % 3 === 0 ? "#E02F1F" : "#3E5FFF",
          opacity: opacity * 0.5,
          boxShadow: `0 0 ${size * 4}px ${i % 3 === 0 ? "#E02F1F" : "#3E5FFF"}`,
        }}
      />
    );
  });

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};
