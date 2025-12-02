/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Mono",
        outfit: '"Outfit", sans-serif',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter", "dracula"],
  },
};
