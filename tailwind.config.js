/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'googlesans': ['Google Sans', 'sans-serif'],
      },
      colors: {
        'gem-bg': '#F2EFEF',
        'gem-brown': '#5A544E',
        'gem-cream': '#E7E0CE',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}