/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'metamask-orange': '#f6851b',
        'dark-navy': '#24272a',
        'dark-blue': '#2a2d31',
        'royal-blue': '#3c4043',
        'gold': '#FFD700',
        'gold-dark': '#DAA520',
      },
    },
  },
  plugins: [],
}