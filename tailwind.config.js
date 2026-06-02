/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E4036",     // Musgo
        accent: "#CC5833",      // Argila/Laranja
        accentHover: "#B54624", // Argila escuro
        bgCreme: "#F2F0E9",     // Creme
        dark: "#1A1A1A",        // Carvão
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Outfit'", "sans-serif"],
        heading: ["'Outfit'", "sans-serif"],
        drama: ["'Cormorant Garamond'", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '3rem',
      },
      scale: {
        103: '1.03',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'elastic-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
