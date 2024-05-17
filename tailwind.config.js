/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Chemins vers tous les fichiers JS, JSX, TS, et TSX
    "./public/index.html" // Chemin vers votre fichier HTML principal
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      fontFamily: {
        'baloo': ['"Baloo 2"', 'cursive'], // Assurez-vous que le nom correspond exactement à Google Fonts
      },
      
    },
  },
  plugins: [],
}

