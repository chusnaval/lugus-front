/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lugus: {
          bg: "#121212",
          bgAlt: "#1a1a1a",
          text: "#e0e0e0",
          muted: "#9e9e9e",
          blue: "#0078d4",
          gold: "#cfae5a",
        }
      }
    },
  },
  plugins: [],
}
