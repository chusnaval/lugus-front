/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "sans-serif"],
      },
      colors: {
        lugus: {
          bg: "#121212",
          bgAlt: "#1a1a1a",
          text: "#e0e0e0",
          muted: "#9e9e9e",
          blue: "#0078d4",
          gold: "#cfae5a",
          red: "#ff3b3b",
          silver: "#c0c0c0",
          green: "#28a745"
        }
      }
    },
  },
  plugins: [],
}
