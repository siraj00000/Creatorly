/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px"
      },
      colors: {
        "main": '#307bc1',
        "black": '#334155',
        "light": '#f8fafc',
        "light-gray": '#6b7280'
      },
    },
  },
  plugins: [],
}

