const autoprefixer = require("autoprefixer");
const postcss = require("postcss");

/** @type {import('tailwindcss').Config} */

module.exports = {
  // Where tailwind css will look for files to apply css to (NO CSS FILES)
  // Be as specific as possible as it scans every file in a directory
  // Uses blob pattern
  // Visit https://tailwindcss.com/docs/content-configuration
  content: ['./index.html', './src/components/**/*.{js,jsx}'],
  // These are default themes I took
  // TODO: Customize
  // Visit https://tailwindcss.com/docs/theme for documentation
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray': {
        'dark': '#273444',
        DEFAULT: '#8492a6',
        'light': '#d3dce6'
      },
      /* Main Theme */
      'primary-bg': '#fefefe',
      'secondary-bg': ' #eff0ef',
      'primary-theme': '#b99df3',
      'secondary-theme': '#8b5bea',
      'primary-accent': '#00618b',
      'secondary-accent': '#179dd4',
      'tertiary-accent': '#39aad9',

      /* Fonts */
      'white-font': {
        100: '#ffffff',
        200: '#fefefe',
        300: '#eff0ef',
        400: '#d4d4d4',
        500: ' #a7a7a7',
      },
      'purple-font': {
        100: '#d0bff3',
        200: '#b99df3',
        300: '#9274cb',
        400: '#5c3385',
        500: '#340069',
      },
      'blue-font': {
        100: '#ace3fa',
        200: '#81d0f1',
        200: '#39aad9',
        300: '#179dd4',
        400: '#00628b',
      }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [autoprefixer(), postcss()],
};
