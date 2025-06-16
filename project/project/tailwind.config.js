import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#e6f9f0',
          100: '#ccf3e0',
          200: '#99e6c1',
          300: '#66daa2',
          400: '#33cd83',
          500: '#00c164',
          600: '#009a50',
          700: '#00743c',
          800: '#004d28',
          900: '#002714',
        },
      },
    },
  },
  plugins: [],
}