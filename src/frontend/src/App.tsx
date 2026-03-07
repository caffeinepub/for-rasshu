import { useCallback, useEffect, useRef, useState } from "react";

// ===================== TYPES =====================

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ===================== HOOKS =====================

function useCountdown(targetDate: Date, forceZero = false) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // Separate flag so consumers know if the countdown genuinely expired
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (forceZero) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setExpired(true);
      return;
    }
    const calc = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setExpired(true);
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
  }, [targetDate, forceZero]);

  return { timeLeft, expired };
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
    top: `${85 + Math.random() * 15}%`,
    size: `${10 + Math.random() * 16}px`,
    // Spread durations wider so hearts never bunch up at the top together
    duration: `${11 + Math.random() * 9}s`,
    // Spread delays across a full cycle so they enter in a smooth stream
    delay: `-${(i / count) * 18 + Math.random() * 4}s`,
    opacity: `${0.35 + Math.random() * 0.45}`,
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

function generateStarParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    // Random position across the whole screen for galaxy starfield
    top: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 3}px`,
    duration: `${4 + Math.random() * 8}s`,
    delay: `-${Math.random() * 10}s`,
    opacity: `${0.3 + Math.random() * 0.6}`,
  }));
}

// Pre-generate stable particle sets (reduced for performance)
const heartParticles = generateHeartParticles(14);
const sparkleParticles = generateSparkleParticles(14);
const orbParticles = generateOrbParticles(10);

// Birthday-specific particle sets
const bdayStarParticles = generateStarParticles(50);
const bdayHeartParticles = generateHeartParticles(12);
const bdaySparkleParticles = generateSparkleParticles(16);

// ===================== POLAROID CARD =====================

function PolaroidCard({
  src,
  label,
  className = "",
  style = {},
  objectPosition = "center",
  loading = "lazy",
  fetchPriority,
}: {
  src: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <div className={`polaroid-card ${className}`} style={style}>
      <img
        src={src}
        alt={label}
        className="w-full"
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        style={{
          height: "180px",
          width: "100%",
          display: "block",
          objectFit: "cover",
          objectPosition: objectPosition,
        }}
      />
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
}: {
  variant:
    | "dark"
    | "peach"
    | "blush"
    | "black"
    | "secret"
    | "birthday"
    | "bdayHero";
}) {
  const configs = {
    bdayHero: [
      {
        color: "oklch(0.38 0.22 310 / 0.5)",
        size: "75vw",
        top: "-25%",
        left: "-20%",
        anim: "blobDrift1 28s ease-in-out infinite",
      },
      {
        color: "oklch(0.32 0.18 340 / 0.45)",
        size: "65vw",
        top: "35%",
        left: "45%",
        anim: "blobDrift2 22s ease-in-out infinite",
      },
      {
        color: "oklch(0.44 0.2 290 / 0.38)",
        size: "60vw",
        top: "60%",
        left: "-15%",
        anim: "blobDrift3 32s ease-in-out infinite",
      },
      {
        color: "oklch(0.22 0.12 320 / 0.55)",
        size: "80vw",
        top: "-5%",
        left: "25%",
        anim: "blobDrift4 25s ease-in-out infinite",
      },
    ],
    birthday: [
      {
        color: "oklch(0.35 0.2 22 / 0.55)",
        size: "75vw",
        top: "-25%",
        left: "-20%",
        anim: "blobDrift1 28s ease-in-out infinite",
      },
      {
        color: "oklch(0.28 0.18 355 / 0.45)",
        size: "65vw",
        top: "35%",
        left: "45%",
        anim: "blobDrift2 22s ease-in-out infinite",
      },
      {
        color: "oklch(0.42 0.22 30 / 0.4)",
        size: "60vw",
        top: "60%",
        left: "-15%",
        anim: "blobDrift3 32s ease-in-out infinite",
      },
      {
        color: "oklch(0.20 0.1 10 / 0.5)",
        size: "80vw",
        top: "-5%",
        left: "25%",
        anim: "blobDrift4 25s ease-in-out infinite",
      },
    ],
    secret: [
      {
        color: "oklch(0.38 0.2 300 / 0.4)",
        size: "70vw",
        top: "-20%",
        left: "-20%",
        anim: "blobDrift1 23s ease-in-out infinite",
      },
      {
        color: "oklch(0.28 0.18 280 / 0.35)",
        size: "60vw",
        top: "40%",
        left: "50%",
        anim: "blobDrift2 18s ease-in-out infinite",
      },
      {
        color: "oklch(0.45 0.22 320 / 0.3)",
        size: "55vw",
        top: "60%",
        left: "-10%",
        anim: "blobDrift3 29s ease-in-out infinite",
      },
      {
        color: "oklch(0.22 0.12 260 / 0.5)",
        size: "80vw",
        top: "-10%",
        left: "30%",
        anim: "blobDrift4 21s ease-in-out infinite",
      },
    ],
    dark: [
      {
        color: "oklch(0.35 0.18 22 / 0.45)",
        size: "70vw",
        top: "-20%",
        left: "-20%",
        anim: "blobDrift1 23s ease-in-out infinite",
      },
      {
        color: "oklch(0.28 0.14 15 / 0.4)",
        size: "60vw",
        top: "40%",
        left: "50%",
        anim: "blobDrift2 18s ease-in-out infinite",
      },
      {
        color: "oklch(0.42 0.2 28 / 0.3)",
        size: "55vw",
        top: "60%",
        left: "-10%",
        anim: "blobDrift3 29s ease-in-out infinite",
      },
      {
        color: "oklch(0.2 0.1 10 / 0.5)",
        size: "80vw",
        top: "-10%",
        left: "30%",
        anim: "blobDrift4 21s ease-in-out infinite",
      },
    ],
    peach: [
      {
        color: "oklch(0.88 0.1 55 / 0.6)",
        size: "80vw",
        top: "-15%",
        left: "-20%",
        anim: "blobDrift1 26s ease-in-out infinite",
      },
      {
        color: "oklch(0.82 0.12 40 / 0.5)",
        size: "65vw",
        top: "45%",
        left: "40%",
        anim: "blobDrift2 20s ease-in-out infinite",
      },
      {
        color: "oklch(0.9 0.08 60 / 0.4)",
        size: "55vw",
        top: "65%",
        left: "-5%",
        anim: "blobDrift3 23s ease-in-out infinite",
      },
      {
        color: "oklch(0.85 0.09 48 / 0.45)",
        size: "70vw",
        top: "10%",
        left: "55%",
        anim: "blobDrift4 16s ease-in-out infinite",
      },
    ],
    blush: [
      {
        color: "oklch(0.9 0.08 58 / 0.6)",
        size: "75vw",
        top: "-20%",
        left: "-15%",
        anim: "blobDrift2 22s ease-in-out infinite",
      },
      {
        color: "oklch(0.85 0.1 45 / 0.45)",
        size: "60vw",
        top: "50%",
        left: "45%",
        anim: "blobDrift1 29s ease-in-out infinite",
      },
      {
        color: "oklch(0.88 0.07 62 / 0.4)",
        size: "50vw",
        top: "70%",
        left: "-10%",
        anim: "blobDrift4 18s ease-in-out infinite",
      },
      {
        color: "oklch(0.82 0.11 50 / 0.35)",
        size: "65vw",
        top: "5%",
        left: "60%",
        anim: "blobDrift3 25s ease-in-out infinite",
      },
    ],
    black: [
      {
        color: "oklch(0.4 0.22 22 / 0.3)",
        size: "70vw",
        top: "-20%",
        left: "-15%",
        anim: "blobDrift3 26s ease-in-out infinite",
      },
      {
        color: "oklch(0.3 0.18 18 / 0.25)",
        size: "60vw",
        top: "55%",
        left: "50%",
        anim: "blobDrift1 20s ease-in-out infinite",
      },
      {
        color: "oklch(0.45 0.2 28 / 0.2)",
        size: "55vw",
        top: "60%",
        left: "-15%",
        anim: "blobDrift2 23s ease-in-out infinite",
      },
      {
        color: "oklch(0.25 0.12 12 / 0.4)",
        size: "85vw",
        top: "-5%",
        left: "25%",
        anim: "blobDrift4 17s ease-in-out infinite",
      },
    ],
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
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
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
}

// ===================== SLIDE -1: SECRET INTRO =====================

function SecretSlide({ isActive }: { isActive: boolean }) {
  return (
    <div
      data-ocid="secret.section"
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${isActive ? "slide-active" : ""}`}
      style={{
        background:
          "linear-gradient(160deg, oklch(0.12 0.08 300) 0%, oklch(0.08 0.05 280) 50%, oklch(0.06 0.03 260) 100%)",
      }}
    >
      <AnimatedBlobs variant="secret" />

      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkleParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "white",
              animation: `sparkleRotate ${p.duration} ${p.delay} infinite ease-in-out`,
              opacity: Number.parseFloat(p.opacity) * 0.6,
            }}
          />
        ))}
      </div>

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.45 0.25 300 / 0.25), transparent 70%)",
          animation: "pulse-glow-red 4s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[380px] mx-auto w-full">
        {/* Question mark icon */}
        <div
          className="slide-el mb-6"
          style={
            {
              fontSize: "clamp(4rem, 16vw, 6rem)",
              animation: "pulse-glow-red 3s ease-in-out infinite",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          <span
            className="heartbeat-anim"
            style={{
              display: "inline-block",
              color: "oklch(0.75 0.2 300)",
              filter: "drop-shadow(0 0 20px oklch(0.55 0.25 300 / 0.8))",
            }}
          >
            ✦
          </span>
        </div>

        {/* Heading */}
        <h1
          className="slide-el playfair font-black leading-tight mb-3"
          style={
            {
              fontSize: "clamp(1.6rem, 7vw, 2.4rem)",
              color: "oklch(0.9 0.08 300)",
              letterSpacing: "-0.01em",
              textShadow:
                "0 0 30px oklch(0.65 0.25 300 / 0.6), 0 0 60px oklch(0.5 0.2 280 / 0.3)",
              "--delay": "100ms",
            } as React.CSSProperties
          }
        >
          something awaits you
        </h1>

        {/* Subtitle */}
        <p
          className="slide-el crimson-pro italic mb-8 float-anim"
          style={
            {
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              color: "oklch(0.65 0.1 290)",
              maxWidth: 300,
              "--delay": "200ms",
            } as React.CSSProperties
          }
        >
          are you ready to see what's inside?
        </p>

        {/* Dots */}
        <div
          className="slide-el flex gap-2 mb-2"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          {["0s", "0.2s", "0.4s"].map((d) => (
            <span
              key={d}
              className="rounded-full heartbeat-anim"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: "oklch(0.7 0.18 300)",
                animationDelay: d,
              }}
            />
          ))}
        </div>
      </div>
    </div>
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

      {/* Radial glow – also drifts */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, oklch(0.4 0.2 20 / 0.3), transparent 70%)",
          animation:
            "pulse-glow-red 4s ease-in-out infinite, blobDrift3 12s ease-in-out infinite",
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
        {/* Hero polaroid – floats continuously */}
        <div
          className="slide-el photo-float-anim mb-4"
          style={
            {
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.55))",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          <PolaroidCard
            src="/assets/uploads/IMG_20260223_210743-5.jpg"
            label="my everything 🌹"
            style={{ width: 170 }}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Badge – rotates and floats */}
        <div
          className="slide-el rotate-float inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full"
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

        {/* Main heading – shimmer glow */}
        <h1
          className="slide-el playfair font-black leading-tight mb-2 glow-text-red shimmer-heading"
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

        {/* Italic subheading – subtle breath */}
        <h2
          className="slide-el playfair italic mb-4 breath-anim"
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
          className="slide-el crimson-pro leading-relaxed mb-5 float-anim"
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

        {/* Hearts decorators – staggered heartbeat */}
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
          <span
            className="heartbeat-anim"
            style={{ display: "inline-block", animationDelay: "0s" }}
          >
            ♥
          </span>
          <span
            className="heartbeat-anim"
            style={{ display: "inline-block", animationDelay: "0.2s" }}
          >
            ♥
          </span>
          <span
            className="heartbeat-anim"
            style={{ display: "inline-block", animationDelay: "0.4s" }}
          >
            ♥
          </span>
        </div>
      </div>
    </div>
  );
}

// ===================== SLIDE 1: LOVE LETTER =====================

function LoveLetterSlide({ isActive }: { isActive: boolean }) {
  const letterItems = [
    {
      text: "every day with you feels like the most beautiful dream i never want to wake up from.",
      delay: "80ms",
      floatDelay: "0s",
    },
    {
      text: "you make ordinary moments extraordinary just by being in them.",
      delay: "160ms",
      floatDelay: "0.3s",
    },
    {
      text: "i love every laugh, every look, every little thing about you.",
      delay: "240ms",
      floatDelay: "0.6s",
    },
    {
      text: "you are my favorite person, my safe place, my greatest adventure.",
      delay: "320ms",
      floatDelay: "0.9s",
    },
  ];

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

      {/* Lips top-left decoration – rotate-float */}
      <div
        className="absolute top-6 left-5 select-none pointer-events-none rotate-float"
        style={{ fontSize: 36, opacity: 0.25 }}
      >
        💋
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6 max-w-[420px] mx-auto w-full">
        {/* Italic heading – shimmer */}
        <h2
          className="slide-el playfair italic font-bold mb-6 shimmer-heading"
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

        {/* Letter paragraphs – each floats with staggered delay */}
        <div className="flex flex-col gap-4">
          {letterItems.map((item) => (
            <p
              key={item.text}
              className="slide-el crimson-pro italic leading-relaxed float-anim"
              style={
                {
                  fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
                  color: "oklch(0.35 0.07 30)",
                  "--delay": item.delay,
                  animationDelay: item.floatDelay,
                } as React.CSSProperties
              }
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Sign-off – breath animation */}
        <p
          className="slide-el crimson-pro italic text-center mt-8 font-semibold breath-anim"
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

// ===================== REVEAL POLAROID =====================

function RevealPolaroid({
  src,
  label,
  rotation,
  animDelay,
  objectPosition = "center top",
  ocid,
}: {
  src: string;
  label: string;
  rotation: string;
  animDelay: string;
  objectPosition?: string;
  ocid: string;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      data-ocid={ocid}
      className="flex justify-center polaroid-anim"
      aria-label={`Tap to reveal: ${label}`}
      onClick={() => setRevealed(true)}
      style={
        {
          "--rot": rotation,
          animationDelay: animDelay,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
        } as React.CSSProperties
      }
    >
      <div
        style={{
          width: "100%",
          maxWidth: 190,
          position: "relative",
        }}
      >
        {/* Hidden state overlay */}
        {!revealed && (
          <div
            className="polaroid-card reveal-hidden"
            style={{
              width: "100%",
              cursor: "pointer",
            }}
          >
            {/* Mystery placeholder */}
            <div
              style={{
                height: 180,
                width: "100%",
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 25 / 0.4) 0%, oklch(0.45 0.2 20 / 0.6) 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  animation: "heartbeat 1.8s ease-in-out infinite",
                  display: "inline-block",
                  filter: "drop-shadow(0 0 8px oklch(0.6 0.2 25 / 0.8))",
                }}
              >
                💕
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "oklch(0.65 0.14 25)",
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontStyle: "italic",
                  letterSpacing: "0.05em",
                  textAlign: "center",
                  padding: "0 8px",
                }}
              >
                tap to reveal
              </span>
            </div>
            <p
              className="text-center crimson-pro mt-1"
              style={{ color: "#8b6e6e", fontSize: 11, fontStyle: "italic" }}
            >
              {label}
            </p>
          </div>
        )}

        {/* Revealed photo */}
        {revealed && (
          <div className="reveal-show">
            <PolaroidCard
              src={src}
              label={label}
              style={{ width: "100%" }}
              objectPosition={objectPosition}
            />
          </div>
        )}
      </div>
    </button>
  );
}

// ===================== SLIDE 2: MEMORIES =====================

const memoryCards = [
  {
    label: "the beginning 💕",
    rotation: "-1.5deg",
    src: "/assets/uploads/IMG-20251108-WA0020-1.jpg",
    objectPosition: "center 20%",
  },
  {
    label: "laughing together ✨",
    rotation: "1.5deg",
    src: "/assets/uploads/IMG_20260224_174538-2.jpg",
    objectPosition: "center top",
  },
  {
    label: "our adventures 🗺️",
    rotation: "1deg",
    src: "/assets/uploads/IMG_20260223_211205-4.jpg",
    objectPosition: "center center",
  },
  {
    label: "cozy moments 🕯️",
    rotation: "-1deg",
    src: "/assets/uploads/IMG_20260122_181239-3.jpg",
    objectPosition: "center top",
  },
] as const;

const ocidLabels = [
  "memories.item.1",
  "memories.item.2",
  "memories.item.3",
  "memories.item.4",
] as const;

const polaroidDelays = ["0s", "0.4s", "0.8s", "1.2s"];

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

      {/* Corner decorations – rotate-float with stagger */}
      <span
        className="absolute top-5 left-5 select-none pointer-events-none rotate-float"
        style={{ fontSize: 28, opacity: 0.5, animationDelay: "0s" }}
      >
        🌸
      </span>
      <span
        className="absolute top-5 right-5 select-none pointer-events-none rotate-float"
        style={{ fontSize: 28, opacity: 0.5, animationDelay: "0.5s" }}
      >
        🌹
      </span>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center px-4 w-full"
        style={{ maxWidth: 460, margin: "0 auto" }}
      >
        {/* Heading – shimmer */}
        <h2
          className="slide-el playfair font-black mb-1 text-center shimmer-heading"
          style={
            {
              fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
              color: "oklch(0.28 0.08 30)",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          our memories
        </h2>

        {/* Subtitle – breath */}
        <p
          className="slide-el crimson-pro italic text-center mb-3 breath-anim"
          style={
            {
              fontSize: "clamp(0.85rem, 3.2vw, 1rem)",
              color: "oklch(0.5 0.18 25)",
              "--delay": "80ms",
            } as React.CSSProperties
          }
        >
          more to come... i love you so much, rasshu 💕
        </p>

        {/* 2x2 reveal polaroid grid */}
        <div
          className="slide-el grid grid-cols-2 mx-auto w-full"
          style={
            {
              maxWidth: 420,
              gap: "clamp(10px, 3vw, 18px)",
              "--delay": "160ms",
            } as React.CSSProperties
          }
        >
          {memoryCards.map((card, i) => (
            <RevealPolaroid
              key={card.label}
              src={card.src}
              label={card.label}
              rotation={card.rotation}
              animDelay={polaroidDelays[i]}
              objectPosition={card.objectPosition}
              ocid={ocidLabels[i]}
            />
          ))}
        </div>

        {/* Closing quote – float */}
        <blockquote
          className="slide-el text-center mt-3 crimson-pro float-anim"
          style={
            {
              fontSize: "clamp(0.82rem, 3vw, 0.98rem)",
              color: "oklch(0.38 0.08 30)",
              fontStyle: "italic",
              lineHeight: 1.5,
              maxWidth: 360,
              "--delay": "240ms",
              animationDelay: "0.4s",
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

// ===================== BIRTHDAY TRANSITION OVERLAY =====================

function BirthdayTransitionOverlay({
  onTransitionDone,
}: {
  onTransitionDone: () => void;
}) {
  // phase: "in" → fully visible, "out" → fading out
  const [phase, setPhase] = useState<"in" | "out">("in");
  const doneFired = useRef(false);

  const triggerExit = useCallback(() => {
    if (doneFired.current) return;
    doneFired.current = true;
    setPhase("out");
    // Wait for fade-out (1s) then call parent
    setTimeout(() => {
      onTransitionDone();
    }, 1000);
  }, [onTransitionDone]);

  // Auto-exit after 3.5s
  useEffect(() => {
    const t = setTimeout(triggerExit, 3500);
    return () => clearTimeout(t);
  }, [triggerExit]);

  const birthdayOverlayEmojis = [
    { emoji: "🎂", delay: "0.4s", key: "cake" },
    { emoji: "💖", delay: "0.6s", key: "sparkleheart" },
    { emoji: "🎉", delay: "0.8s", key: "party" },
    { emoji: "🌸", delay: "1.0s", key: "blossom" },
    { emoji: "✨", delay: "1.2s", key: "sparkle" },
  ];

  return (
    <button
      type="button"
      onClick={triggerExit}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, oklch(0.10 0.07 10) 0%, oklch(0.14 0.09 15) 50%, oklch(0.09 0.05 355) 100%)",
        opacity: phase === "in" ? 1 : 0,
        transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        overflow: "hidden",
        border: "none",
        padding: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Deep nebula blobs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <AnimatedBlobs variant="bdayHero" />
      </div>

      {/* Galaxy starfield */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {bdayStarParticles.map((p) => (
          <div
            key={`star-overlay-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background:
                p.id % 4 === 0
                  ? "oklch(0.92 0.12 55)"
                  : p.id % 4 === 1
                    ? "oklch(0.88 0.1 30)"
                    : "oklch(0.95 0.05 40)",
              boxShadow: `0 0 ${Number.parseFloat(p.size) * 2.5}px oklch(0.85 0.18 50 / 0.8)`,
              animation: `galaxyTwinkle ${p.duration} ${p.delay} infinite ease-in-out`,
              opacity: Number.parseFloat(p.opacity) * 0.8,
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {bdayHeartParticles.map((p) => (
          <div
            key={`bdayheart-overlay-${p.id}`}
            className="absolute select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              animation: `heartSway ${16 + p.id * 0.9}s ${p.delay} infinite linear`,
              opacity: Number.parseFloat(p.opacity) * 0.75,
              color:
                p.id % 3 === 0
                  ? "oklch(0.72 0.22 22)"
                  : p.id % 3 === 1
                    ? "oklch(0.78 0.18 355)"
                    : "oklch(0.82 0.15 35)",
            }}
          >
            {p.id % 4 === 0
              ? "🌹"
              : p.id % 4 === 1
                ? "💕"
                : p.id % 4 === 2
                  ? "♥"
                  : "✦"}
          </div>
        ))}
      </div>

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.35 0.18 22 / 0.38), transparent 70%)",
          animation: "pulse-glow-red 5s ease-in-out infinite",
        }}
      />

      {/* Center content — uses its own keyframe animations, NOT slide-el */}
      <div
        className="relative flex flex-col items-center text-center px-6"
        style={{ maxWidth: 380, zIndex: 10 }}
      >
        {/* Cake icon */}
        <div
          style={{
            fontSize: "clamp(3.5rem, 14vw, 5rem)",
            filter: "drop-shadow(0 0 28px oklch(0.85 0.22 55 / 0.9))",
            animation:
              "bdayOverlayEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both, heartbeat 3s ease-in-out 1s infinite",
            marginBottom: "1rem",
          }}
        >
          🎂
        </div>

        {/* Big heading */}
        <h1
          className="playfair font-black"
          style={{
            fontSize: "clamp(2.4rem, 9vw, 4rem)",
            background:
              "linear-gradient(135deg, oklch(0.92 0.1 48) 0%, oklch(0.82 0.2 30) 30%, oklch(0.88 0.16 18) 60%, oklch(0.92 0.1 48) 100%)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            animation:
              "bdayOverlayEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both, gradientShift 6s linear 1.2s infinite",
            filter: "drop-shadow(0 0 20px oklch(0.65 0.2 30 / 0.65))",
            marginBottom: "0.75rem",
          }}
        >
          It&apos;s Your Big Day
        </h1>

        {/* Subheading */}
        <p
          className="crimson-pro italic"
          style={{
            fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
            color: "oklch(0.9 0.08 25)",
            textShadow: "0 0 24px oklch(0.65 0.2 22 / 0.8)",
            animation:
              "bdayOverlayEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both",
            marginBottom: "1.5rem",
          }}
        >
          Rasshu 🌹
        </p>

        {/* Emoji row */}
        <div style={{ display: "flex", gap: "0.75rem", fontSize: "1.6rem" }}>
          {birthdayOverlayEmojis.map((item) => (
            <span
              key={item.key}
              style={{
                display: "inline-block",
                animation: `bdayOverlayEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${item.delay} both, heartbeat 3.5s ease-in-out ${item.delay} infinite`,
              }}
            >
              {item.emoji}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

// ===================== SLIDE 5: BIRTHDAY HERO =====================

function BirthdayHeroSlide({ isActive }: { isActive: boolean }) {
  return (
    <div
      data-ocid="birthday.section"
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${isActive ? "slide-active" : ""}`}
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.1 300) 0%, oklch(0.10 0.08 320) 50%, oklch(0.08 0.05 340) 100%)",
      }}
    >
      {/* Plum-to-rose animated blobs — z-index 0 */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <AnimatedBlobs variant="bdayHero" />
      </div>

      {/* Galaxy starfield recoloured in rose/violet tones — z-index 1 */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {bdayStarParticles.map((p) => (
          <div
            key={`star-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background:
                p.id % 4 === 0
                  ? "oklch(0.88 0.14 320)"
                  : p.id % 4 === 1
                    ? "oklch(0.82 0.1 300)"
                    : "oklch(0.95 0.06 310)",
              boxShadow: `0 0 ${Number.parseFloat(p.size) * 3}px ${
                p.id % 4 === 0
                  ? "oklch(0.75 0.2 320 / 0.9)"
                  : "oklch(0.68 0.18 300 / 0.7)"
              }`,
              animation: `galaxyTwinkle ${p.duration} ${p.delay} infinite ease-in-out`,
              opacity: Number.parseFloat(p.opacity) * 0.85,
            }}
          />
        ))}
      </div>

      {/* Floating pink/rose hearts — z-index 1 */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {bdayHeartParticles.map((p) => (
          <div
            key={`bdayheart-${p.id}`}
            className="absolute select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              animation: `heartSway ${16 + p.id * 0.9}s ${p.delay} infinite linear`,
              opacity: Number.parseFloat(p.opacity) * 0.7,
              color:
                p.id % 3 === 0
                  ? "oklch(0.72 0.22 330)"
                  : p.id % 3 === 1
                    ? "oklch(0.68 0.22 320)"
                    : "oklch(0.78 0.18 315)",
            }}
          >
            {p.id % 4 === 0
              ? "🌹"
              : p.id % 4 === 1
                ? "💕"
                : p.id % 4 === 2
                  ? "♥"
                  : "✦"}
          </div>
        ))}
      </div>

      {/* Rose sparkle dust — z-index 1 */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {bdaySparkleParticles.map((p) => (
          <div
            key={`bdaysparkle-${p.id}`}
            className="absolute select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: `${6 + (p.id % 7)}px`,
              animation: `galaxySparkle ${9 + p.id * 0.6}s ${p.delay} infinite ease-in-out`,
              opacity: Number.parseFloat(p.opacity) * 0.65,
              color:
                p.id % 2 === 0 ? "oklch(0.78 0.2 320)" : "oklch(0.72 0.18 310)",
            }}
          >
            {p.id % 2 === 0 ? "✦" : "✧"}
          </div>
        ))}
      </div>

      {/* Plum radial glow — z-index 2 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, oklch(0.38 0.2 310 / 0.32), transparent 70%)",
          animation: "pulse-glow-red 5s ease-in-out infinite",
        }}
      />

      {/* Content — z-index 10, mirrors Women's Day hero layout exactly */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-[420px] mx-auto w-full">
        {/* Hero polaroid — floats continuously, same as Women's Day hero */}
        <div
          className="slide-el photo-float-anim mb-4"
          style={
            {
              filter: "drop-shadow(0 10px 28px oklch(0.12 0.12 310 / 0.75))",
              "--delay": "0ms",
            } as React.CSSProperties
          }
        >
          <div
            className="polaroid-card bday-polaroid"
            style={{
              width: "clamp(150px, 44vw, 185px)",
              background: "white",
            }}
          >
            <img
              src="/assets/uploads/IMG-20260222-WA0008-1.jpg"
              alt="my birthday girl"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                width: "100%",
                height: "clamp(188px, 55vw, 232px)",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            <div style={{ padding: "5px 8px 3px" }}>
              <p
                className="crimson-pro italic text-center"
                style={{ color: "#8b6e6e", fontSize: 11 }}
              >
                My World 🌹
              </p>
            </div>
          </div>
        </div>

        {/* Badge pill — plum glow, same structure as Women's Day badge */}
        <div
          className="slide-el rotate-float inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full"
          style={
            {
              border: "1px solid oklch(0.55 0.2 310 / 0.6)",
              background: "oklch(0.22 0.1 300 / 0.45)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "0 0 16px oklch(0.45 0.2 310 / 0.4), 0 0 32px oklch(0.35 0.18 300 / 0.22)",
              "--delay": "80ms",
            } as React.CSSProperties
          }
        >
          <span
            className="crimson-pro tracking-[0.2em] uppercase"
            style={{
              color: "oklch(0.78 0.15 320)",
              fontSize: 11,
            }}
          >
            ✨ March 11th · Her Birthday ✨
          </span>
        </div>

        {/* Main heading — shimmer glow in plum-rose tones */}
        <h1
          className="slide-el playfair font-black leading-tight mb-2 shimmer-heading"
          style={
            {
              fontSize: "clamp(2rem, 8vw, 3.2rem)",
              color: "oklch(0.95 0.04 320)",
              letterSpacing: "-0.01em",
              textShadow:
                "0 0 24px oklch(0.72 0.22 310 / 0.8), 0 0 48px oklch(0.55 0.18 300 / 0.5)",
              "--delay": "160ms",
            } as React.CSSProperties
          }
        >
          Happy Birthday baby
        </h1>

        {/* Italic name sub-heading — breath animation */}
        <h2
          className="slide-el playfair italic mb-4 breath-anim"
          style={
            {
              fontSize: "clamp(1.3rem, 5vw, 1.9rem)",
              color: "oklch(0.78 0.18 315)",
              "--delay": "240ms",
            } as React.CSSProperties
          }
        >
          My Rasshu Gullaw 🌹
        </h2>

        {/* Body — gentle float, same pattern as Women's Day hero */}
        <p
          className="slide-el crimson-pro leading-relaxed mb-3 float-anim"
          style={
            {
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              color: "oklch(0.85 0.05 320)",
              maxWidth: 360,
              lineHeight: 1.7,
              "--delay": "320ms",
            } as React.CSSProperties
          }
        >
          This is a big day and I am the happiest person on this most important
          day of your life I love you so much happy birthday love
        </p>

        {/* Love line — italic, slightly larger, floats */}
        <p
          className="slide-el crimson-pro italic float-anim mb-4"
          style={
            {
              fontSize: "clamp(1.05rem, 4.5vw, 1.4rem)",
              color: "oklch(0.9 0.1 330)",
              textShadow:
                "0 0 18px oklch(0.65 0.22 320 / 0.65), 0 0 36px oklch(0.5 0.18 310 / 0.35)",
              "--delay": "400ms",
            } as React.CSSProperties
          }
        >
          I love youuuuu ❤️
        </p>

        {/* Hearts row — staggered heartbeat */}
        <div
          className="slide-el flex gap-3"
          style={
            {
              color: "oklch(0.68 0.22 320)",
              fontSize: "1.4rem",
              "--delay": "480ms",
            } as React.CSSProperties
          }
        >
          <span
            className="heartbeat-anim"
            style={{ display: "inline-block", animationDelay: "0s" }}
          >
            🌹
          </span>
          <span
            className="heartbeat-anim"
            style={{ display: "inline-block", animationDelay: "0.3s" }}
          >
            ❤️
          </span>
          <span
            className="heartbeat-anim"
            style={{ display: "inline-block", animationDelay: "0.6s" }}
          >
            🌹
          </span>
        </div>
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
        className="countdown-box-glow flex items-center justify-center rounded-xl"
        style={{
          background: "oklch(0.14 0.03 15)",
          border: "1px solid oklch(0.3 0.1 22 / 0.4)",
          width: "clamp(58px, 16vw, 80px)",
          height: "clamp(64px, 18vw, 86px)",
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

const countdownEmojiItems = [
  { emoji: "❤️", delay: "0s", key: "heart-1" },
  { emoji: "🌹", delay: "0.2s", key: "rose-1" },
  { emoji: "💕", delay: "0.4s", key: "hearts-1" },
  { emoji: "🌹", delay: "0.6s", key: "rose-2" },
  { emoji: "❤️", delay: "0.8s", key: "heart-2" },
];

function CountdownSlide({
  isActive,
  onBirthdayTrigger,
}: {
  isActive: boolean;
  onBirthdayTrigger: () => void;
}) {
  const targetDate = new Date("2026-03-11T00:00:00");
  const { timeLeft, expired } = useCountdown(targetDate, false);
  const triggered = useRef(false);

  useEffect(() => {
    if (!triggered.current && expired) {
      triggered.current = true;
      // Small delay so she sees 00:00:00:00 before the transition fires
      setTimeout(() => {
        onBirthdayTrigger();
      }, 1500);
    }
  }, [expired, onBirthdayTrigger]);

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
        style={{ paddingBottom: "1rem" }}
      >
        {/* Badge – badge-pulse */}
        <div
          className="slide-el badge-pulse inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-sm"
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

        {/* Heading – gradient shift + shimmer */}
        <h2
          className="slide-el playfair font-black mb-3 gradient-text-warm shimmer-heading"
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

        {/* Mysterious date – breath */}
        <p
          className="slide-el mb-5 tracking-[0.5em] breath-anim"
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

        {/* Mysterious hint – float */}
        <p
          className="slide-el tracking-[0.3em] uppercase mb-4 float-anim"
          style={
            {
              color: "oklch(0.35 0.05 20)",
              fontSize: 11,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
              "--delay": "320ms",
              animationDelay: "0.3s",
            } as React.CSSProperties
          }
        >
          Only Time Knows . . .
        </p>

        {/* Emoji row – staggered heartbeat */}
        <div
          className="slide-el flex gap-3 mb-3"
          style={
            {
              fontSize: "1.4rem",
              "--delay": "400ms",
            } as React.CSSProperties
          }
        >
          {countdownEmojiItems.map((item) => (
            <span
              key={item.key}
              className="heartbeat-anim"
              style={{
                display: "inline-block",
                animationDelay: item.delay,
              }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

        {/* Footer text – breath */}
        <p
          className="slide-el tracking-[0.2em] breath-anim"
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
        className="absolute bottom-0 left-0 right-0 py-3 text-center"
        style={{
          zIndex: 10,
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

// ===================== BACKGROUND COLORS PER SLIDE =====================

// These are the solid base colors for each slide -- used for cross-fade overlay
const SLIDE_BG_COLORS = [
  // 0: secret (slightly warmer purple that flows into dark red)
  "oklch(0.08 0.04 300)",
  // 1: hero (dark red)
  "oklch(0.16 0.09 13)",
  // 2: love letter (peach)
  "oklch(0.91 0.06 52)",
  // 3: memories (blush)
  "oklch(0.91 0.055 54)",
  // 4: countdown (near black)
  "oklch(0.08 0.015 10)",
  // 5: birthday hero (deep midnight plum — matches bdayHero palette)
  "oklch(0.10 0.08 310)",
];

// ===================== APP =====================

const SLIDES = 6;
type SlideState =
  | { kind: "idle"; current: number }
  | {
      kind: "animating";
      current: number;
      next: number;
      phase: "fade-out" | "fade-in";
    };

// Returns true if today is on or after March 8th of the current year (or any future year)
function isPastWomensDay(): boolean {
  const now = new Date();
  const year = now.getFullYear();
  const womensDay = new Date(year, 2, 8); // March 8
  return now >= womensDay;
}

const VIEWED_KEY = "rasshu_womens_day_viewed";

export default function App() {
  // Determine starting slide: if past March 8th and already viewed, start at countdown (slide 4)
  const getInitialSlide = () => {
    if (isPastWomensDay()) {
      const viewed = localStorage.getItem(VIEWED_KEY);
      if (viewed === "true") return 4; // jump straight to countdown
    }
    return 0;
  };

  const [slideState, setSlideState] = useState<SlideState>(() => ({
    kind: "idle",
    current: getInitialSlide(),
  }));
  // Mirror slideState into a ref so callbacks always read the latest value
  const slideStateRef = useRef<SlideState>({
    kind: "idle",
    current: getInitialSlide(),
  });
  useEffect(() => {
    slideStateRef.current = slideState;
  }, [slideState]);

  const [activeKey, setActiveKey] = useState<number>(0);
  // Track the blended background color during transition
  const [bgOverlayColor, setBgOverlayColor] = useState<string | null>(null);
  const [bgOverlayOpacity, setBgOverlayOpacity] = useState(0);
  // Birthday transition overlay
  const [showBirthdayTransition, setShowBirthdayTransition] = useState(false);
  // Touch swipe tracking
  const touchStartX = useRef<number>(0);
  const appContainerRef = useRef<HTMLDivElement>(null);

  // Register non-passive touchmove listener so preventDefault actually works
  // (React synthetic events are passive by default on modern browsers)
  useEffect(() => {
    const el = appContainerRef.current;
    if (!el) return;
    const handler = (e: TouchEvent) => {
      e.preventDefault();
    };
    el.addEventListener("touchmove", handler, { passive: false });
    return () => el.removeEventListener("touchmove", handler);
  }, []);
  // Whether we're in "post March 8th viewed" mode — show replay button
  const [showReplayBtn, setShowReplayBtn] = useState(() => {
    if (isPastWomensDay()) {
      return localStorage.getItem(VIEWED_KEY) === "true";
    }
    return false;
  });

  const current =
    slideState.kind === "idle" ? slideState.current : slideState.current;

  // Use ref-based state reads so this callback is always fresh even with empty deps
  const runTransitionTo = useCallback(
    (targetIndex: number) => {
      const ss = slideStateRef.current;
      if (ss.kind === "animating") return;
      const cur = ss.current;
      const next = targetIndex;

      setSlideState({
        kind: "animating",
        current: cur,
        next,
        phase: "fade-out",
      });
      setBgOverlayColor(SLIDE_BG_COLORS[next]);
      setBgOverlayOpacity(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBgOverlayOpacity(1);
        });
      });

      setTimeout(() => {
        setSlideState({
          kind: "animating",
          current: cur,
          next,
          phase: "fade-in",
        });
        setTimeout(() => {
          setBgOverlayOpacity(0);
          setTimeout(() => {
            setBgOverlayColor(null);
            setSlideState({ kind: "idle", current: next });
            setActiveKey((k) => k + 1);
          }, 1300);
        }, 80);
      }, 800);
    },
    // Empty deps: always reads latest state via slideStateRef
    [],
  );

  const goNext = useCallback(() => {
    const ss = slideStateRef.current;
    if (ss.kind === "animating") return;
    const cur = ss.current;
    if (cur >= SLIDES - 1) return; // already on last page, do nothing
    // Slide 4 is the countdown — never let a swipe skip to the birthday page (slide 5).
    // The birthday page is only reachable via the BirthdayTransitionOverlay when the
    // countdown genuinely expires on March 11th.
    if (cur >= 4) return;
    const next = cur + 1;
    // Mark as viewed once she moves past the secret intro page (on/after March 8th)
    if (cur === 0 && isPastWomensDay()) {
      localStorage.setItem(VIEWED_KEY, "true");
      setShowReplayBtn(true);
    }
    runTransitionTo(next);
  }, [runTransitionTo]);

  const _goTo = useCallback(
    (index: number) => {
      runTransitionTo(index);
    },
    [runTransitionTo],
  );

  const renderSlide = (index: number, isActive: boolean) => {
    switch (index) {
      case 0:
        return <SecretSlide isActive={isActive} />;
      case 1:
        return <HeroSlide isActive={isActive} />;
      case 2:
        return <LoveLetterSlide isActive={isActive} />;
      case 3:
        return <MemoriesSlide isActive={isActive} />;
      case 4:
        return (
          <CountdownSlide
            isActive={isActive}
            onBirthdayTrigger={() => setShowBirthdayTransition(true)}
          />
        );
      case 5:
        return <BirthdayHeroSlide isActive={isActive} />;
      default:
        return null;
    }
  };

  // What slide content to show
  const displayIndex =
    slideState.kind === "animating" && slideState.phase === "fade-in"
      ? slideState.next
      : current;

  const isContentVisible =
    slideState.kind === "idle" ||
    (slideState.kind === "animating" && slideState.phase === "fade-in");

  // Next button label for intro page
  return (
    <div
      ref={appContainerRef}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) goNext();
        // Right swipe (diff < -50) intentionally does nothing
      }}
      style={{
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        background: SLIDE_BG_COLORS[displayIndex],
        transition: "background 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
        contain: "layout style paint",
      }}
    >
      {/* Slide content with fade transition */}
      <div
        key={`slide-${displayIndex}-${activeKey}`}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          opacity: isContentVisible ? 1 : 0,
          transition: isContentVisible
            ? "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.15s"
            : "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      >
        {renderSlide(displayIndex, slideState.kind === "idle")}
      </div>

      {/* Secret page "Click to Reveal Secret" button -- shown as a centered prominent button */}
      {displayIndex === 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 16px))",
            opacity: isContentVisible ? 1 : 0,
            transition: isContentVisible
              ? "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.15s"
              : "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: isContentVisible ? "auto" : "none",
          }}
        >
          <button
            type="button"
            data-ocid="secret.primary_button"
            onClick={goNext}
            className="secret-reveal-btn"
            style={{
              minHeight: 60,
              minWidth: 220,
              borderRadius: 9999,
              border: "1.5px solid oklch(0.65 0.22 300 / 0.8)",
              background: "oklch(0.15 0.08 280 / 0.7)",
              color: "oklch(0.92 0.1 300)",
              backdropFilter: "blur(16px)",
              cursor: "pointer",
              fontSize: "clamp(1rem, 4vw, 1.15rem)",
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontWeight: 600,
              letterSpacing: "0.04em",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
              boxShadow:
                "0 4px 32px oklch(0.55 0.25 300 / 0.5), 0 0 60px oklch(0.45 0.2 280 / 0.25)",
              zIndex: 30,
            }}
          >
            ✦ Click to Reveal Secret ✦
          </button>
        </div>
      )}

      {/* Background color blend overlay */}
      {bgOverlayColor && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background: bgOverlayColor,
            opacity: bgOverlayOpacity,
            transition: "opacity 1.3s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Replay button — top-left, only shown after March 8th once already viewed, on the countdown slide */}
      {showReplayBtn && current === 4 && (
        <button
          type="button"
          data-ocid="countdown.secondary_button"
          onClick={() => {
            runTransitionTo(0);
          }}
          style={{
            position: "absolute",
            top: "calc(0.85rem + env(safe-area-inset-top, 0px))",
            left: "1rem",
            zIndex: 30,
            background: "oklch(0.14 0.05 15 / 0.75)",
            border: "1px solid oklch(0.35 0.12 22 / 0.6)",
            borderRadius: 9999,
            color: "oklch(0.65 0.14 28)",
            fontSize: 11,
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontStyle: "italic",
            letterSpacing: "0.04em",
            padding: "6px 14px",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            opacity: isContentVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: isContentVisible ? "auto" : "none",
          }}
        >
          ← see from start
        </button>
      )}

      {/* Birthday transition overlay */}
      {showBirthdayTransition && (
        <BirthdayTransitionOverlay
          onTransitionDone={() => {
            // Snap directly to birthday slide (no slide-transition needed,
            // the overlay already provided the visual bridge)
            setSlideState({ kind: "idle", current: 5 });
            setActiveKey((k) => k + 1);
            setShowBirthdayTransition(false);
          }}
        />
      )}
    </div>
  );
}
