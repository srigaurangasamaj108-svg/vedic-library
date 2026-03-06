import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#e8e2d3",
        surface: "#f4efe3",
        accent: "#2b2218",
        muted: "#6b5b45",
        gold: "#d4af37",
      },
    },
  },
  plugins: [],
}

export default config
