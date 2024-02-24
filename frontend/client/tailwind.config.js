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
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',

      /* Main Theme */
      'primary-bg': '#fefefe',
      'secondary-bg': ' #eff0ef',
      'primary-theme': '#b99df3',
      'secondary-theme': '#8b5bea',
      'primary-accent': '#00618b',
      'secondary-accent': '#179dd4',
      'tertiary-accent': '#39aad9',

      /* Fonts */
      'white-font-100': '#ffffff',
      'white-font-200': '#fefefe',
      'white-font-300': '#eff0ef',
      'white-font-400': '#d4d4d4',
      'white-font-500': ' #a7a7a7',
      'purple-font-100': '#d0bff3',
      'purple-font-200': '#b99df3',
      'purple-font-300': '#9274cb',
      'purple-font-400': '#5c3385',
      'purple-font-500': '#340069',
      'blue-font-100': '#ace3fa',
      'blue-font-200': '#81d0f1',
      'blue-font-200': '#39aad9',
      'blue-font-300': '#179dd4',
      'blue-font-400': '#00628b',
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
};
