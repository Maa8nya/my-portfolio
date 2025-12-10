module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "soft-glow": "0 0 40px rgba(56,189,248,0.5)",
      },
      backgroundImage: {
        "grid-dark": "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)",
        "grid-light": "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.20) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
