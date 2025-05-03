import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        purple: {
          50: "#f8f5ff",
          100: "#f0e7ff",
          200: "#e1d0ff",
          300: "#c9a9ff",
          400: "#ac7dff",
          500: "#9152ff",
          600: "#7a28ff",
          700: "#6c1df9",
          800: "#5a1ad0",
          900: "#4a1aa6",
        },
        green: {
          50: "#f0fdf6",
          100: "#dcfce9",
          200: "#bbf7d6",
          300: "#86efb0",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803c",
          800: "#166534",
          900: "#14532d",
        },
        beige: {
          50: "#fefcf8",
          100: "#fdf7ed",
          200: "#fbedd6",
          300: "#f6dbb3",
          400: "#f0c285",
          500: "#e9a352",
          600: "#e5882c",
          700: "#d97320",
          800: "#b35c1d",
          900: "#934c1d",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
      },
      transitionDuration: {
        "3000": "3000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
