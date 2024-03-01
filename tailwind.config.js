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
        'cor-principal': '#E8E8E8',
        'cor-secundaria': '#E8E8E8',
        'cor-tercearia': '#ED6E33',
        'amarelo': '#FFCC2A',
        'verde': '#9EB04D',
        'back-cinza': '#E7E7E7',
        'cinza': '#606060',
        'cinza2': '#979797',
        'border-form': '#0d8482', 
        'botao': '#ED6E33'
      }
    },
    fontFamily: {
      'RobotoMono':'Roboto Mono',
      "Arial": ["Arial"],
      'Inter': 'Inter'
    },
    backgroundImage: {
      'fundo-borda': "url('/images/bg_01.png')",
    },
  },
  plugins: [],
}
