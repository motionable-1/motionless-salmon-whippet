import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { CyberBackground, CyberParticles } from "./CyberBackground";
import { NordVPNLogo } from "./NordVPNLogo";
import {
  FadeInWords,
  BlurReveal,
  HackerText,
} from "../library/components/text/TextAnimation";
import { Glow, AnimatedGlow } from "../library/components/effects/Glow";

const { fontFamily } = loadFont();

// Brand colors
const COLORS = {
  primary: "#E02F1F",
  accent: "#3E5FFF",
  dark: "#141415",
  white: "#FFFFFF",
};

// Icon URLs from Iconify
const ICONS = {
  shield: "https://api.iconify.design/heroicons/shield-check-solid.svg?color=%233E5FFF&width=48",
  bolt: "https://api.iconify.design/heroicons/bolt-solid.svg?color=%23E02F1F&width=48",
  globe: "https://api.iconify.design/heroicons/globe-alt-solid.svg?color=%233E5FFF&width=48",
  lock: "https://api.iconify.design/heroicons/lock-closed-solid.svg?color=%233E5FFF&width=48",
  eye: "https://api.iconify.design/heroicons/eye-slash-solid.svg?color=%23E02F1F&width=48",
  server: "https://api.iconify.design/heroicons/server-stack-solid.svg?color=%233E5FFF&width=48",
  key: "https://api.iconify.design/heroicons/key-solid.svg?color=%23E02F1F&width=48",
  check: "https://api.iconify.design/heroicons/check-circle-solid.svg?color=%2322c55e&width=48",
};

// ============================================
// Scene 1: Intro with Logo
// ============================================
const IntroScene: React.FC<{ startFrom?: number }> = ({ startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrom);

  // Shield icon animation
  const shieldScale = spring({
    frame: f,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const shieldRotate = interpolate(f, [0, 30], [180, 0], {
    extrapolateRight: "clamp",
  });

  const shieldOpacity = interpolate(f, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline animation timing
  const taglineStart = 25;

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Shield Icon */}
        <div
          style={{
            opacity: shieldOpacity,
            transform: `scale(${shieldScale}) rotate(${shieldRotate}deg)`,
          }}
        >
          <AnimatedGlow color={COLORS.accent} intensity={30} layers={3} duration={0.5}>
            <div
              className="flex items-center justify-center w-32 h-32 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent}40 0%, ${COLORS.accent}10 100%)`,
                border: `2px solid ${COLORS.accent}60`,
              }}
            >
              <Img src={ICONS.shield} style={{ width: 64, height: 64 }} />
            </div>
          </AnimatedGlow>
        </div>

        {/* Logo */}
        <NordVPNLogo startFrom={15} size={280} />

        {/* Tagline */}
        <FadeInWords
          startFrom={taglineStart}
          className="text-white/70 text-2xl tracking-wide"
          style={{ fontFamily }}
        >
          Your Shield in the Digital World
        </FadeInWords>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 2: Feature 1 - Lightning Fast VPN
// ============================================
const Feature1Scene: React.FC<{ startFrom?: number }> = ({ startFrom = 0 }) => {
  const frame = useCurrentFrame();
  useVideoConfig();
  const f = Math.max(0, frame - startFrom);

  // Stats animation
  const serverCount = Math.min(6000, Math.round(interpolate(f, [30, 70], [0, 6000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  const locationCount = Math.min(188, Math.round(interpolate(f, [40, 80], [0, 188], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  // Icon animations
  const boltPulse = 1 + Math.sin(f / 10) * 0.1;

  return (
    <AbsoluteFill className="flex items-center justify-center px-20">
      <div className="flex items-center gap-20 w-full max-w-5xl">
        {/* Left side - Visual */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <AnimatedGlow color={COLORS.primary} intensity={40} layers={3} duration={0.5} pulsateAfter>
            <div
              className="flex items-center justify-center w-40 h-40 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}30 0%, ${COLORS.primary}10 100%)`,
                border: `2px solid ${COLORS.primary}50`,
                transform: `scale(${boltPulse})`,
              }}
            >
              <Img src={ICONS.bolt} style={{ width: 80, height: 80 }} />
            </div>
          </AnimatedGlow>

          {/* Server icons row */}
          <div className="flex gap-4 mt-4">
            {[0, 1, 2].map((i) => {
              const delay = i * 8;
              const iconOpacity = interpolate(f - delay, [20, 35], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const iconY = interpolate(f - delay, [20, 35], [20, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  className="flex items-center justify-center w-16 h-16 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent}25 0%, ${COLORS.accent}08 100%)`,
                    border: `1px solid ${COLORS.accent}30`,
                    opacity: iconOpacity,
                    transform: `translateY(${iconY}px)`,
                  }}
                >
                  <Img src={ICONS.server} style={{ width: 32, height: 32 }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col gap-6">
          <BlurReveal
            startFrom={5}
            className="text-5xl font-bold text-white leading-tight whitespace-nowrap"
            style={{ fontFamily }}
          >
            Lightning-Fast VPN
          </BlurReveal>

          <FadeInWords
            startFrom={20}
            className="text-xl text-white/60 leading-relaxed"
            style={{ fontFamily }}
          >
            Post-quantum encryption protects your data with military-grade security
          </FadeInWords>

          {/* Stats */}
          <div className="flex gap-12 mt-6">
            <div className="flex flex-col">
              <span
                className="text-5xl font-bold"
                style={{ color: COLORS.accent, fontFamily, fontVariantNumeric: "tabular-nums" }}
              >
                {serverCount.toLocaleString()}+
              </span>
              <span className="text-white/50 text-sm uppercase tracking-wider" style={{ fontFamily }}>
                Servers
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="text-5xl font-bold"
                style={{ color: COLORS.primary, fontFamily, fontVariantNumeric: "tabular-nums" }}
              >
                {locationCount}+
              </span>
              <span className="text-white/50 text-sm uppercase tracking-wider" style={{ fontFamily }}>
                Locations
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: Feature 2 - Threat Protection Pro
// ============================================
const Feature2Scene: React.FC<{ startFrom?: number }> = ({ startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrom);

  // Shield animation
  const shieldPulse = 1 + Math.sin(f / 15) * 0.05;

  // Blocked threats counter
  const threatsBlocked = Math.min(1000000, Math.round(interpolate(f, [40, 90], [0, 1000000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  // Format number with M suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <AbsoluteFill className="flex items-center justify-center px-20">
      <div className="flex items-center gap-20 w-full max-w-5xl">
        {/* Left side - Content */}
        <div className="flex-1 flex flex-col gap-6">
          <BlurReveal
            startFrom={5}
            className="text-5xl font-bold text-white leading-tight whitespace-nowrap"
            style={{ fontFamily }}
          >
            Threat Protection Pro
          </BlurReveal>

          <FadeInWords
            startFrom={20}
            className="text-xl text-white/60 leading-relaxed"
            style={{ fontFamily }}
          >
            Automatically blocks malware, trackers, and phishing attempts in real-time
          </FadeInWords>

          {/* Feature list */}
          <div className="flex flex-col gap-4 mt-4">
            {["Block malware downloads", "Stop phishing attacks", "Remove intrusive ads"].map((item, i) => {
              const itemOpacity = interpolate(f - (i * 10), [35, 50], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const itemX = interpolate(f - (i * 10), [35, 50], [-30, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                  }}
                >
                  <Img src={ICONS.check} style={{ width: 24, height: 24 }} />
                  <span className="text-white/80 text-lg" style={{ fontFamily }}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <AnimatedGlow color={COLORS.accent} intensity={35} layers={3} duration={0.5} pulsateAfter>
            <div
              className="relative flex items-center justify-center w-48 h-48 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent}25 0%, ${COLORS.accent}08 100%)`,
                border: `2px solid ${COLORS.accent}40`,
                transform: `scale(${shieldPulse})`,
              }}
            >
              <Img src={ICONS.shield} style={{ width: 96, height: 96 }} />
              
              {/* Orbiting lock icon */}
              <div
                className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: COLORS.dark,
                  border: `1px solid ${COLORS.primary}50`,
                  transform: `rotate(${f * 2}deg) translateX(90px) rotate(${-f * 2}deg)`,
                }}
              >
                <Img src={ICONS.lock} style={{ width: 24, height: 24 }} />
              </div>
            </div>
          </AnimatedGlow>

          {/* Threats blocked stat */}
          <div className="flex flex-col items-center mt-4">
            <span
              className="text-4xl font-bold"
              style={{ color: COLORS.primary, fontFamily, fontVariantNumeric: "tabular-nums" }}
            >
              {formatNumber(threatsBlocked)}+
            </span>
            <span className="text-white/50 text-sm uppercase tracking-wider" style={{ fontFamily }}>
              Threats Blocked Daily
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 4: Feature 3 - Dark Web Monitor
// ============================================
const Feature3Scene: React.FC<{ startFrom?: number }> = ({ startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrom);

  // Eye scan animation
  const scanLine = interpolate(f % 60, [0, 60], [-50, 50], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex items-center justify-center px-20">
      <div className="flex items-center gap-20 w-full max-w-5xl">
        {/* Left side - Visual */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <AnimatedGlow color={COLORS.primary} intensity={35} layers={3} duration={0.5} pulsateAfter>
            <div
              className="relative flex items-center justify-center w-48 h-48 rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.dark} 100%)`,
                border: `2px solid ${COLORS.primary}40`,
              }}
            >
              <Img src={ICONS.eye} style={{ width: 80, height: 80 }} />
              
              {/* Scan line */}
              <div
                className="absolute left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
                  top: `calc(50% + ${scanLine}px)`,
                  opacity: 0.6,
                }}
              />
            </div>
          </AnimatedGlow>

          {/* Key icon row */}
          <div className="flex gap-4 mt-4">
            {[ICONS.key, ICONS.lock, ICONS.shield].map((icon, i) => {
              const delay = i * 10;
              const iconOpacity = interpolate(f - delay, [25, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const iconScale = spring({
                frame: Math.max(0, f - delay - 25),
                fps,
                config: { damping: 10, stiffness: 120 },
              });

              return (
                <div
                  key={i}
                  className="flex items-center justify-center w-14 h-14 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent}20 0%, ${COLORS.accent}05 100%)`,
                    border: `1px solid ${COLORS.accent}25`,
                    opacity: iconOpacity,
                    transform: `scale(${iconScale})`,
                  }}
                >
                  <Img src={icon} style={{ width: 28, height: 28 }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col gap-6">
          <BlurReveal
            startFrom={5}
            className="text-5xl font-bold text-white leading-tight whitespace-nowrap"
            style={{ fontFamily }}
          >
            Dark Web Monitor
          </BlurReveal>

          <FadeInWords
            startFrom={20}
            className="text-xl text-white/60 leading-relaxed"
            style={{ fontFamily }}
          >
            24/7 monitoring alerts you if your credentials appear on the dark web
          </FadeInWords>

          {/* Feature highlights */}
          <div className="flex flex-col gap-4 mt-4">
            {["Password manager included", "Instant breach alerts", "Secure credential vault"].map((item, i) => {
              const itemOpacity = interpolate(f - (i * 10), [35, 50], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const itemX = interpolate(f - (i * 10), [35, 50], [-30, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                  }}
                >
                  <Img src={ICONS.check} style={{ width: 24, height: 24 }} />
                  <span className="text-white/80 text-lg" style={{ fontFamily }}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 5: Outro with CTA
// ============================================
const OutroScene: React.FC<{ startFrom?: number }> = ({ startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - startFrom);

  // Button animation
  const buttonScale = spring({
    frame: Math.max(0, f - 40),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const buttonGlow = 20 + Math.sin(f / 15) * 10;

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        {/* Logo */}
        <NordVPNLogo startFrom={0} size={320} />

        {/* Tagline */}
        <HackerText
          startFrom={20}
          className="text-3xl text-white/80 tracking-wide"
          style={{ fontFamily }}
          chars="01ABCDEF"
          initialColor={COLORS.accent}
        >
          Complete Digital Security
        </HackerText>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${buttonScale})`,
            opacity: interpolate(f, [40, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Glow color={COLORS.primary} intensity={buttonGlow} layers={2}>
            <div
              className="px-12 py-5 rounded-full font-bold text-xl text-white"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, #c4261a 100%)`,
                fontFamily,
              }}
            >
              Get NordVPN Now
            </div>
          </Glow>
        </div>

        {/* Trust badges */}
        <div className="flex gap-8 mt-6">
          {["30-Day Guarantee", "24/7 Support", "No Logs Policy"].map((badge, i) => {
            const badgeOpacity = interpolate(f - (i * 8), [55, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const badgeY = interpolate(f - (i * 8), [55, 70], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{
                  opacity: badgeOpacity,
                  transform: `translateY(${badgeY}px)`,
                }}
              >
                <Img src={ICONS.check} style={{ width: 20, height: 20 }} />
                <span className="text-white/60 text-sm" style={{ fontFamily }}>{badge}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Main Composition
// ============================================
export const Main: React.FC = () => {
  // Scene durations in frames (30fps)
  const introDuration = 90;      // 3 seconds
  const feature1Duration = 120;  // 4 seconds
  const feature2Duration = 120;  // 4 seconds
  const feature3Duration = 120;  // 4 seconds
  const outroDuration = 120;     // 4 seconds
  const transitionDuration = 15; // 0.5 seconds

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Background layer - persistent across all scenes */}
      <CyberBackground variant="gradient" />
      <CyberParticles />

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: Intro */}
        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Feature 1 - Lightning Fast VPN */}
        <TransitionSeries.Sequence durationInFrames={feature1Duration}>
          <Feature1Scene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Feature 2 - Threat Protection */}
        <TransitionSeries.Sequence durationInFrames={feature2Duration}>
          <Feature2Scene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: Feature 3 - Dark Web Monitor */}
        <TransitionSeries.Sequence durationInFrames={feature3Duration}>
          <Feature3Scene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: Outro */}
        <TransitionSeries.Sequence durationInFrames={outroDuration}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
