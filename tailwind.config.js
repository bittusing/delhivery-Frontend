/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'fly-navy': '#0e1533',
        'fly-navy-2': '#0b173a',
        'fly-orange': '#F97316',
        'fly-light': '#fbfbfc'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}