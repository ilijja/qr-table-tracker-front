/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'floor-pattern': "url('/src/assets/bg/floor.jpeg')",
        'menu-pattern': "url('/src/assets/bg/menubg.jpeg')",
      },
    },
  },
  plugins: [],
}