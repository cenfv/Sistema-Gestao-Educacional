/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-red-base': '#DA0613',
        'custom-red-semi': '#cc0814',
        'custom-red-dark': '#A30E0A',
      },
    },
  },
  plugins: [],
}
