/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lemon1: "#FFF3B0",
        lemon2: "#FFE27A",
        yellowSecondary: "#F28705",
      },
      backgroundImage: {
        "lemon-gradient": "linear-gradient(to right, #FFF3B0, #FFE27A)",
      },
    },
  },
  plugins: [],
};
