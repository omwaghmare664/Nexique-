/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Geo: ["Geologica", 'sans-serif'], // Use the font family you imported
      },
    },
  },
  plugins: [],
}