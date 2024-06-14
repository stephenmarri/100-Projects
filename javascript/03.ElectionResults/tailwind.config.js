/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1/10': '10%',
        '1.5/10': '15%'
      }
    },
  },
  plugins: [],
}