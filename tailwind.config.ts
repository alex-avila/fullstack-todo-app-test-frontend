import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "app-blue": {
          DEFAULT: "#4EA8DE",
          dark: "#1E6F9F",
        },
        "app-purple": {
          DEFAULT: "#8284FA",
          dark: "#5357c2",
        },
        "app-gray": {
          200: "#808080",
          300: "#333333",
          350: "#262626",
          400: "#1a1a1a",
          500: "#0d0d0d",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
