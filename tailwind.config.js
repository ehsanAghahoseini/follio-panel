/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'follio': {
          50: "#444",
          100: "#797878",
          200: "#55c6d8"
        },
      }
    },
  },
  plugins: [],
}
