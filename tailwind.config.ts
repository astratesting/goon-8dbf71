import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1E",
        indigo: "#4F6BFF",
        cyan: "#00D4FF",
        teal: "#00FFCC",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        body: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
