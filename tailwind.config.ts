import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        speak: {
          blue: "#1746FC",
          "blue-soft": "#E8EEFF",
          "blue-muted": "#A8B8F5",
          ink: "#111827",
          muted: "#8B8B95",
          line: "#ECECF0",
          soft: "#F4F5F7",
          green: "#1DB87A",
          orange: "#FF8A3D",
          pink: "#FF5C8A",
          purple: "#7B6CFF",
          danger: "#E5484D",
          "danger-bg": "#FEECEC",
        },
      },
      boxShadow: {
        card: "0 2px 12px rgba(17, 24, 39, 0.06)",
        phone: "0 24px 64px rgba(17, 24, 39, 0.18)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
