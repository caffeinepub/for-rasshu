import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        crimson: ["'Crimson Pro'", "Georgia", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Custom theme colors
        crimson: {
          50: "oklch(0.97 0.02 15)",
          100: "oklch(0.93 0.04 18)",
          200: "oklch(0.85 0.08 20)",
          300: "oklch(0.72 0.13 22)",
          400: "oklch(0.6 0.18 22)",
          500: "oklch(0.5 0.22 22)",
          600: "oklch(0.45 0.22 20)",
          700: "oklch(0.38 0.2 18)",
          800: "oklch(0.28 0.15 16)",
          900: "oklch(0.18 0.09 15)",
        },
        peach: {
          50: "oklch(0.97 0.02 55)",
          100: "oklch(0.95 0.03 55)",
          200: "oklch(0.93 0.05 55)",
          300: "oklch(0.9 0.07 52)",
          400: "oklch(0.85 0.1 50)",
          500: "oklch(0.78 0.12 48)",
        },
        "dark-void": {
          DEFAULT: "oklch(0.08 0.01 10)",
          light: "oklch(0.12 0.015 12)",
          mid: "oklch(0.15 0.02 15)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        polaroid: "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)",
        "glow-red": "0 0 30px oklch(0.5 0.22 22 / 0.4), 0 0 60px oklch(0.45 0.2 20 / 0.2)",
        "glow-orange": "0 0 30px oklch(0.72 0.18 45 / 0.4), 0 0 60px oklch(0.65 0.2 40 / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-up": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-110vh) rotate(30deg)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.35" },
          "50%": { transform: "scale(1.15)", opacity: "0.55" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "orb-drift": {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.15" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)", opacity: "0.25" },
          "66%": { transform: "translate(-20px, -60px) scale(0.95)", opacity: "0.2" },
          "100%": { transform: "translate(0, 0) scale(1)", opacity: "0.15" },
        },
        "number-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-up": "float-up var(--duration, 8s) var(--delay, 0s) infinite linear",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scroll-bounce": "scroll-bounce 1.5s ease-in-out infinite",
        "orb-drift": "orb-drift var(--duration, 12s) var(--delay, 0s) infinite ease-in-out",
        "number-pulse": "number-pulse 0.3s ease",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
