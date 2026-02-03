module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./component/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b14",
        card: "#141428",
        primary: "#7c3aed",
        text: "#e5e7eb",
        muted: "#9ca3af",
      },
    },
  },
  plugins: [],
}
