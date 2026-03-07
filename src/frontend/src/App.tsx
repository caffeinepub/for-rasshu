import { useCallback, useEffect, useRef, useState } from "react";

// ===================== TYPES =====================

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ===================== HOOKS =====================

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ===================== PARTICLES =====================

interface Particle {
  id: number;
  left: string;
  top: string;
  size: string;
  duration: string;
  delay: string;
  opacity: string;
}

function generateHeartParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${80 + Math.random() * 20}%`,
    size: `${12 + Math.random() * 20}px`,
    duration: `${6 + Math.random() * 8}s`,
    delay: `${Math.random() * 8}s`,
    opacity: `${0.3 + Math.random() * 0.5}`,
  }));
}

function generateSparkleParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${10 + Math.random() * 18}px`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 6}s`,
    opacity: `${0.2 + Math.random() * 0.6}`,
  }));
}

function generateOrbParticles(
  count: number,
): Array<Particle & { width: string; height: string }> {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${60 + Math.random() * 160}px`,
    width: `${60 + Math.random() * 160}px`,
    height: `${60 + Math.random() * 120}px`,
    duration: `${10 + Math.random() * 14}s`,
    delay: `${Math.random() * 10}s`,
    opacity: `${0.08 + Math.random() * 0.15}`,
  }));
}

// Pre-generate stable particle sets
const heartParticles = generateHeartParticles(18);
const sparkleParticles = generateSparkleParticles(16);
const orbParticles = generateOrbParticles(12);

// ===================== PHOTO PLACEHOLDER =====================

function PhotoPlaceholder({
  label,
  className = "",
  style = {},
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`polaroid-card ${className}`} style={style}>
      <div
        className="w-full bg-gray-100 flex flex-col items-center justify-center gap-2"
        style={{
          border: "2px dashed #d1c0b8",
          borderRadius: 2,
          aspectRatio: "4/3",
          minHeight: 80,
        }}
      >
        <span style={{ fontSize: 24, opacity: 0.4 }}>📷</span>
        <p
          className="text-center crimson-pro"
          style={{
            color: "#b8a0a0",
            fontSize: 10,
            lineHeight: 1.4,
            opacity: 0.7,
          }}
        >
          photo
          <br />
          coming soon
        </p>
      </div>
      <p
        className="text-center crimson-pro mt-1"
        style={{ color: "#8b6e6e", fontSize: 11, fontStyle: "italic" }}
      >
        {label}
      </p>
    </div>
  );
}

// ===================== ANIMATED BLOBS =====================

function AnimatedBlobs({
  variant,
}: { variant: "dark" | "peach" | "blush" | "black" }) {
  const configs = {
    dark: [
      {
        color: "oklch(0.35 0.18 22 / 0.45)",
        size: "70vw",
        top: "-20%",
        left: "-20%",
        anim: "blobDrift1 18s ease-in-out infinite",
      },
      {
        color: "oklch(0.28 0.14 15 / 0.4)",
        size: "60vw",
        top: "40%",
        left: "50%",
        anim: "blobDrift2 14s ease-in-out infinite",
      },
      {
        color: "oklch(0.42 0.2 28 / 0.3)",
        size: "55vw",
        top: "60%",
        left: "-10%",
        anim: "blobDrift3 22s ease-in-out infinite",
      },
      {
        color: "oklch(0.2 0.1 10 / 0.5)",
        size: "80vw",
        top: "-10%",
        left: "30%",
        anim: "blobDrift4 16s ease-in-out infinite",
      },
    ],
    peach: [
      {
        color: "oklch(0.88 0.1 55 / 0.6)",
        size: "80vw",
        top: "-15%",
        left: "-20%",
        anim: "blobDrift1 20s ease-in-out infinite",
      },
      {
        color: "oklch(0.82 0.12 40 / 0.5)",
        size: "65vw",
        top: "45%",
        left: "40%",
        anim: "blobDrift2 15s ease-in-out infinite",
      },
      {
        color: "oklch(0.9 0.08 60 / 0.4)",
        size: "55vw",
        top: "65%",
        left: "-5%",
        anim: "blobDrift3 18s ease-in-out infinite",
      },
      {
        color: "oklch(0.85 0.09 48 / 0.45)",
        size: "70vw",
        top: "10%",
        left: "55%",
        anim: "blobDrift4 12s ease-in-out infinite",
      },
    ],
    blush: [
      {
        color: "oklch(0.9 0.08 58 / 0.6)",
        size: "75vw",
        top: "-20%",
        left: "-15%",
        anim: "blobDrift2 17s ease-in-out infinite",
      },
      {
        color: "oklch(0.85 0.1 45 / 0.45)",
        size: "60vw",
        top: "50%",
        left: "45%",
        anim: "blobDrift1 22s ease-in-out infinite",
      },
      {
        color: "oklch(0.88 0.07 62 / 0.4)",
        size: "50vw",
        top: "70%",
        left: "-10%",
        anim: "blobDrift4 14s ease-in-out infinite",
      },
      {
        color: "oklch(0.82 0.11 50 / 0.35)",
        size: "65vw",
        top: "5%",
        left: "60%",
        anim: "blobDrift3 19s ease-in-out infinite",
      },
    ],
    black: [
      {
        color: "oklch(0.4 0.22 22 / 0.3)",
        size: "70vw",
        top: "-20%",
        left: "-15%",
        anim: "blobDrift3 20s ease-in-out infinite",
      },
      {
        color: "oklch(0.3 0.18 18 / 0.25)",
        size: "60vw",
        top: "55%",
        left: "50%",
        anim: "blobDrift1 15s ease-in-out infinite",
      },
      {
        color: "oklch(0.45 0.2 28 / 0.2)",
        size: "55vw",
        top: "60%",
        left: "-15%",
        anim: "blobDrift2 18s ease-in-out infinite",
      },
      {
        color: "oklch(0.25 0.12 12 / 0.4)",
        size: "85vw",
        top: "-5%",
        left: "25%",
        anim: "blobDrift4 13s ease-in-out infinite",
      },
    ],
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {configs[variant].map((blob) => (
        <div
          key={blob.anim}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
            animation: blob.anim,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

// ===================== NEXT BUTTON =====================

function NextButton({
  onNext,
  isLast,
  darkTheme,
}: {
  onNext: () => void;
  isLast: boolean;
  darkTheme: boolean;
}) {
  return (
    <button
      type="button"
      data-ocid="nav.next_button"
      onClick={onNext}
      className="next-btn-pulse absolute left-1/2"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 16px))",
        minHeight: 56,
        minWidth: 160,
        borderRadius: 9999,
        border: darkTheme
          ? "1.5px solid oklch(0.55 0.2 25 / 0.7)"
          : "1.5px solid oklch(0.5 0.18 25 / 0.5)",
        background: darkTheme
          ? "oklch(0.12 0.04 15 / 0.7)"
          : "oklch(0.95 0.03 50 / 0.7)",
        color: darkTheme ? "oklch(0.88 0.1 28)" : "oklch(0.35 0.15 22)",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
        fontSize: "clamp(1rem, 4vw, 1.1rem)",
        fontFamily: "'Crimson Pro', Georgia, serif",
        fontWeight: 600,
        letterSpacing: "0.03em",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        zIndex: 50,
        boxShadow: darkTheme
          ? "0 4px 24px oklch(0.4 0.2 22 / 0.4)"
          : "0 4px 20px oklch(0.5 0.15 30 / 0.25)",
        transition: "background 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {isLast ? "Start Over ↺" : "Next →"}
    </button>
  );
}

// ===================== SLIDE 0: HERO =====================

function HeroSlide({ isActive }: { isActive: boolean }) {
  return (
    <div
      data-ocid="hero.section"
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${isActive ? "slide-active" : ""}`}
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.12 15) 0%, oklch(0.15 0.09 12) 50%, oklch(0.10 0.06 10) 100%)",
      }}
    >
      {/* Animated blobs */}
      <AnimatedBlobs variant="dark" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, oklch(0.4 0.2 20 / 0.3), transparent 70%)",
          animation: "pulse-glow-red 4s ease-in-out infinite",
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heartParticles.map((p) => (
          <div
            key={p.id}
            className="absolute select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              animation: `heartSway ${p.duration} ${p.delay} infinite linear`,
              opacity: Number.parseFloat(p.opacity),
              color: "oklch(0.65 0.22 22)",
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-[420px] mx-auto w-full">
        {/* Photo placeholder */}
        <div
          className="slide-el mb-4"
          style={
            {
              transform: "rotate(-2deg)",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.55))",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          <PhotoPlaceholder label="my everything 🌹" style={{ width: 150 }} />
        </div>

        {/* Badge */}
        <div
          className="slide-el inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full"
          style={
            {
              border: "1px solid oklch(0.55 0.2 22 / 0.6)",
              background: "oklch(0.3 0.15 18 / 0.4)",
              backdropFilter: "blur(8px)",
              "--delay": "80ms",
            } as React.CSSProperties
          }
        >
          <span
            className="crimson-pro tracking-[0.2em] uppercase"
            style={{ color: "oklch(0.75 0.15 28)", fontSize: 11 }}
          >
            March 8th · Women's Day
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="slide-el playfair font-black leading-tight mb-2 glow-text-red"
          style={
            {
              fontSize: "clamp(2rem, 8vw, 3.2rem)",
              color: "oklch(0.95 0.05 20)",
              letterSpacing: "-0.01em",
              "--delay": "160ms",
            } as React.CSSProperties
          }
        >
          Happy Women's Day
        </h1>

        {/* Italic subheading */}
        <h2
          className="slide-el playfair italic mb-4"
          style={
            {
              fontSize: "clamp(1.3rem, 5vw, 1.9rem)",
              color: "oklch(0.72 0.18 28)",
              "--delay": "240ms",
            } as React.CSSProperties
          }
        >
          Rasshu Gullaw 🌹
        </h2>

        {/* Body */}
        <p
          className="slide-el crimson-pro leading-relaxed mb-5"
          style={
            {
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              color: "oklch(0.82 0.05 20)",
              maxWidth: 360,
              "--delay": "320ms",
            } as React.CSSProperties
          }
        >
          You are my favorite person in this whole world. Today is your day —
          and every day with you feels like a celebration. I love you so much,
          Rasshu. ❤️
        </p>

        {/* Hearts decorators */}
        <div
          className="slide-el flex gap-3"
          style={
            {
              color: "oklch(0.6 0.22 22)",
              fontSize: "1.4rem",
              "--delay": "400ms",
            } as React.CSSProperties
          }
        >
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
        </div>
      </div>
    </div>
  );
}

// ===================== SLIDE 1: LOVE LETTER =====================

function LoveLetterSlide({ isActive }: { isActive: boolean }) {
  return (
    <div
      data-ocid="letter.section"
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${isActive ? "slide-active" : ""}`}
      style={{
        background:
          "linear-gradient(145deg, oklch(0.93 0.05 55) 0%, oklch(0.9 0.07 50) 50%, oklch(0.87 0.06 48) 100%)",
      }}
    >
      {/* Animated blobs */}
      <AnimatedBlobs variant="peach" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkleParticles.map((p) => (
          <div
            key={p.id}
            className="absolute select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              animation: `sparkleRotate ${p.duration} ${p.delay} infinite ease-in-out`,
              opacity: Number.parseFloat(p.opacity),
              color: "oklch(0.6 0.18 30)",
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Lips top-left decoration */}
      <div
        className="absolute top-6 left-5 select-none pointer-events-none"
        style={{ fontSize: 36, opacity: 0.25 }}
      >
        💋
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6 max-w-[420px] mx-auto w-full">
        {/* Italic heading */}
        <h2
          className="slide-el playfair italic font-bold mb-6"
          style={
            {
              fontSize: "clamp(2rem, 8vw, 3rem)",
              color: "oklch(0.32 0.12 25)",
              lineHeight: 1.1,
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          hey rasshu,
        </h2>

        {/* Letter paragraphs */}
        <div className="flex flex-col gap-4">
          {[
            {
              text: "every day with you feels like the most beautiful dream i never want to wake up from.",
              delay: "80ms",
            },
            {
              text: "you make ordinary moments extraordinary just by being in them.",
              delay: "160ms",
            },
            {
              text: "i love every laugh, every look, every little thing about you.",
              delay: "240ms",
            },
            {
              text: "you are my favorite person, my safe place, my greatest adventure.",
              delay: "320ms",
            },
          ].map((item) => (
            <p
              key={item.text}
              className="slide-el crimson-pro italic leading-relaxed"
              style={
                {
                  fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
                  color: "oklch(0.35 0.07 30)",
                  "--delay": item.delay,
                } as React.CSSProperties
              }
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Sign-off */}
        <p
          className="slide-el crimson-pro italic text-center mt-8 font-semibold"
          style={
            {
              fontSize: "clamp(1rem, 4vw, 1.2rem)",
              color: "oklch(0.48 0.2 22)",
              "--delay": "400ms",
            } as React.CSSProperties
          }
        >
          — always yours ❤
        </p>
      </div>
    </div>
  );
}

// ===================== SLIDE 2: MEMORIES =====================

const memoryCards = [
  { label: "the beginning 💕", rotation: "-2deg" },
  { label: "laughing together ✨", rotation: "2.5deg" },
  { label: "our adventures 🗺️", rotation: "1.5deg" },
  { label: "cozy moments 🕯️", rotation: "-3deg" },
] as const;

const ocidLabels = [
  "memories.item.1",
  "memories.item.2",
  "memories.item.3",
  "memories.item.4",
] as const;

function MemoriesSlide({ isActive }: { isActive: boolean }) {
  return (
    <div
      data-ocid="memories.section"
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${isActive ? "slide-active" : ""}`}
      style={{
        background:
          "linear-gradient(140deg, oklch(0.94 0.04 60) 0%, oklch(0.91 0.06 52) 50%, oklch(0.88 0.07 48) 100%)",
      }}
    >
      {/* Animated blobs */}
      <AnimatedBlobs variant="blush" />

      {/* Corner decorations */}
      <span
        className="absolute top-5 left-5 select-none pointer-events-none"
        style={{ fontSize: 28, opacity: 0.5 }}
      >
        🌸
      </span>
      <span
        className="absolute top-5 right-5 select-none pointer-events-none"
        style={{ fontSize: 28, opacity: 0.5 }}
      >
        🌹
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5 max-w-[420px] mx-auto w-full">
        {/* Heading */}
        <h2
          className="slide-el playfair font-black mb-1 text-center"
          style={
            {
              fontSize: "clamp(1.9rem, 8vw, 3rem)",
              color: "oklch(0.28 0.08 30)",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          our memories
        </h2>

        {/* Subtitle */}
        <p
          className="slide-el crimson-pro italic text-center mb-5"
          style={
            {
              fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
              color: "oklch(0.5 0.18 25)",
              "--delay": "80ms",
            } as React.CSSProperties
          }
        >
          more to come... i love you so much, rasshu 💕
        </p>

        {/* 2x2 polaroid grid */}
        <div
          className="slide-el grid grid-cols-2 gap-3 w-full"
          style={
            {
              maxWidth: 340,
              "--delay": "160ms",
            } as React.CSSProperties
          }
        >
          {memoryCards.map((card, i) => (
            <div
              key={card.label}
              data-ocid={ocidLabels[i]}
              className="flex justify-center"
            >
              <PhotoPlaceholder
                label={card.label}
                style={{
                  width: "100%",
                  maxWidth: 150,
                  transform: `rotate(${card.rotation})`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <blockquote
          className="slide-el text-center mt-4 max-w-[340px] crimson-pro"
          style={
            {
              fontSize: "clamp(0.9rem, 3.5vw, 1.05rem)",
              color: "oklch(0.38 0.08 30)",
              fontStyle: "italic",
              lineHeight: 1.6,
              "--delay": "240ms",
            } as React.CSSProperties
          }
        >
          every moment with you is a memory i treasure forever.{" "}
          <strong style={{ fontStyle: "normal", color: "oklch(0.32 0.1 25)" }}>
            you make my world brighter just by being in it.
          </strong>
        </blockquote>
      </div>
    </div>
  );
}

// ===================== COUNTDOWN BOX =====================

function CountdownBox({ value, label }: { value: number; label: string }) {
  const [animate, setAnimate] = useState(false);
  const prevVal = useRef(value);

  useEffect(() => {
    if (prevVal.current !== value) {
      prevVal.current = value;
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    }
  }, [value]);

  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex items-center justify-center rounded-xl"
        style={{
          background: "oklch(0.14 0.03 15)",
          border: "1px solid oklch(0.3 0.1 22 / 0.4)",
          width: "clamp(58px, 16vw, 80px)",
          height: "clamp(64px, 18vw, 86px)",
          boxShadow:
            "0 4px 24px oklch(0.5 0.22 22 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.05)",
        }}
      >
        <span
          className={`playfair font-black ${animate ? "countdown-number-change" : ""}`}
          style={{
            fontSize: "clamp(1.6rem, 5.5vw, 2.4rem)",
            color: "white",
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          {display}
        </span>
      </div>
      <span
        className="tracking-[0.18em] uppercase"
        style={{
          fontSize: 9,
          color: "oklch(0.55 0.08 25)",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ===================== SLIDE 3: COUNTDOWN =====================

function CountdownSlide({ isActive }: { isActive: boolean }) {
  const targetDate = new Date("2026-03-11T00:00:00");
  const timeLeft = useCountdown(targetDate);

  return (
    <div
      data-ocid="countdown.section"
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${isActive ? "slide-active" : ""}`}
      style={{
        background:
          "linear-gradient(180deg, oklch(0.06 0.01 10) 0%, oklch(0.10 0.02 12) 50%, oklch(0.06 0.01 8) 100%)",
      }}
    >
      {/* Animated blobs */}
      <AnimatedBlobs variant="black" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              background:
                "radial-gradient(circle, oklch(0.5 0.2 22 / 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: `orbDrift ${p.duration} ${p.delay} infinite ease-in-out`,
              opacity: Number.parseFloat(p.opacity),
            }}
          />
        ))}
      </div>

      {/* Red center glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.45 0.22 22 / 0.35) 0%, transparent 70%)",
          animation: "pulse-glow-red 5s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div
        data-ocid="countdown.panel"
        className="relative z-10 flex flex-col items-center text-center px-5 max-w-[420px] mx-auto w-full"
        style={{ paddingBottom: "5rem" }}
      >
        {/* Badge */}
        <div
          className="slide-el inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-sm"
          style={
            {
              border: "1px solid oklch(0.45 0.18 22 / 0.6)",
              background: "oklch(0.12 0.04 15 / 0.8)",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          <span
            className="tracking-[0.25em] uppercase"
            style={{
              color: "oklch(0.65 0.18 28)",
              fontSize: 10,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            ◆ Something is Coming ◆
          </span>
        </div>

        {/* Heading */}
        <h2
          className="slide-el playfair font-black mb-3 gradient-text-warm"
          style={
            {
              fontSize: "clamp(1.8rem, 7vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              "--delay": "80ms",
            } as React.CSSProperties
          }
        >
          just for you, rasshu
        </h2>

        {/* Mysterious date */}
        <p
          className="slide-el mb-5 tracking-[0.5em]"
          style={
            {
              color: "oklch(0.38 0.06 20)",
              fontSize: "clamp(1rem, 4vw, 1.3rem)",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 300,
              "--delay": "160ms",
            } as React.CSSProperties
          }
        >
          0 3 · 1 1
        </p>

        {/* Countdown timer */}
        <div
          className="slide-el flex items-center justify-center gap-2 mb-6 w-full"
          style={{ "--delay": "240ms" } as React.CSSProperties}
        >
          <CountdownBox value={timeLeft.days} label="Days" />
          <span
            style={{
              color: "oklch(0.4 0.15 22)",
              fontSize: "1.8rem",
              lineHeight: 1,
              marginBottom: 14,
            }}
          >
            :
          </span>
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <span
            style={{
              color: "oklch(0.4 0.15 22)",
              fontSize: "1.8rem",
              lineHeight: 1,
              marginBottom: 14,
            }}
          >
            :
          </span>
          <CountdownBox value={timeLeft.minutes} label="Mins" />
          <span
            style={{
              color: "oklch(0.4 0.15 22)",
              fontSize: "1.8rem",
              lineHeight: 1,
              marginBottom: 14,
            }}
          >
            :
          </span>
          <CountdownBox value={timeLeft.seconds} label="Secs" />
        </div>

        {/* Mysterious hint */}
        <p
          className="slide-el tracking-[0.3em] uppercase mb-4"
          style={
            {
              color: "oklch(0.35 0.05 20)",
              fontSize: 11,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
              "--delay": "320ms",
            } as React.CSSProperties
          }
        >
          Only Time Knows . . .
        </p>

        {/* Emoji row */}
        <div
          className="slide-el flex gap-3 mb-3"
          style={
            {
              fontSize: "1.4rem",
              "--delay": "400ms",
            } as React.CSSProperties
          }
        >
          <span>❤️</span>
          <span>🌹</span>
          <span>💕</span>
          <span>🌹</span>
          <span>❤️</span>
        </div>

        {/* Footer text */}
        <p
          className="slide-el tracking-[0.2em]"
          style={
            {
              color: "oklch(0.38 0.08 22)",
              fontSize: 10,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              "--delay": "480ms",
            } as React.CSSProperties
          }
        >
          ◆ the moment draws near ◆
        </p>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 py-3 text-center z-10"
        style={{
          borderTop: "1px solid oklch(0.2 0.03 15)",
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <p
          className="crimson-pro"
          style={{ color: "oklch(0.32 0.04 20)", fontSize: 12 }}
        >
          © {new Date().getFullYear()}. Built with{" "}
          <span style={{ color: "oklch(0.5 0.18 22)" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "oklch(0.55 0.15 28)",
              textDecoration: "underline",
            }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

// ===================== APP =====================

const SLIDES = 4;
type SlideState =
  | { kind: "idle"; current: number }
  | {
      kind: "animating";
      current: number;
      next: number;
      direction: "forward" | "back";
    };

export default function App() {
  const [slideState, setSlideState] = useState<SlideState>({
    kind: "idle",
    current: 0,
  });
  // Track which slides have been active (for re-trigger of entrance animation)
  const [activeKey, setActiveKey] = useState<number>(0);

  const goNext = useCallback(() => {
    if (slideState.kind === "animating") return;
    const current = slideState.current;
    const next = (current + 1) % SLIDES;
    setSlideState({ kind: "animating", current, next, direction: "forward" });
    setTimeout(() => {
      setSlideState({ kind: "idle", current: next });
      setActiveKey((k) => k + 1);
    }, 500);
  }, [slideState]);

  const current =
    slideState.kind === "idle" ? slideState.current : slideState.current;
  const animatingNext =
    slideState.kind === "animating" ? slideState.next : null;

  const isDark = (idx: number) => idx === 0 || idx === 3;

  const renderSlide = (index: number, isActive: boolean) => {
    switch (index) {
      case 0:
        return <HeroSlide isActive={isActive} />;
      case 1:
        return <LoveLetterSlide isActive={isActive} />;
      case 2:
        return <MemoriesSlide isActive={isActive} />;
      case 3:
        return <CountdownSlide isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        background: "#0a0a0a",
      }}
    >
      {/* Current slide */}
      <div
        key={`slide-${current}-${activeKey}`}
        className={
          slideState.kind === "animating"
            ? slideState.direction === "forward"
              ? "slide-exit-left"
              : "slide-exit-right"
            : ""
        }
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
        }}
      >
        {renderSlide(current, slideState.kind === "idle")}
        <NextButton
          onNext={goNext}
          isLast={current === SLIDES - 1}
          darkTheme={isDark(current)}
        />
      </div>

      {/* Incoming slide during animation */}
      {animatingNext !== null && (
        <div
          key={`slide-next-${animatingNext}-${activeKey}`}
          className={
            slideState.kind === "animating"
              ? slideState.direction === "forward"
                ? "slide-enter-right"
                : "slide-enter-left"
              : ""
          }
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
          }}
        >
          {renderSlide(animatingNext, true)}
          <NextButton
            onNext={goNext}
            isLast={animatingNext === SLIDES - 1}
            darkTheme={isDark(animatingNext)}
          />
        </div>
      )}
    </div>
  );
}
