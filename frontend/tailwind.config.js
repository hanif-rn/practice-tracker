/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "forest",
      "retro",
      "pastel",
      "lemonade",
      "business",
      "luxury",
      "black",
      "aqua",
      "lofi",
    ],
  },
};
