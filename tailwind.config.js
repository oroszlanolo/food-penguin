/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {

        'recipe': '60% 40%',
      }
    },
  },
  plugins: [require("daisyui")],
}

