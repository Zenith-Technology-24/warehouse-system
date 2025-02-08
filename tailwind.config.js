/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': ["Lato", 'sans-serif'],
      },
      colors: {
        aaa: {
          DEFAULT: '#4B5320',
          login: '#9FA486',
          text: '#2B2B2B'
        },
      },
    },
  },
  plugins: [],
}
