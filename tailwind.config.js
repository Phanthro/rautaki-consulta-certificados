/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'cor-principal': '#3E4095',
        'cor-secundaria': '#9183c3',
        'amarelo': '#FFCC2A',
        'verde': '#9EB04D',
        'back-cinza': '#E7E7E7',
        'border-form': '#0d8482'
      }
    },
    fontFamily: {
      'RobotoMono':'Roboto Mono',
      "Arial": ["Arial"],
    },
  },
  plugins: [],
}
