/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradient: {
        'black-to-transparent': 'radial-gradient(152% 152% at 15.54% 96.84%,#0e0616 20%,rgba(14,6,22,0) 60%)',
      }
    },
  },
  plugins: [],
}