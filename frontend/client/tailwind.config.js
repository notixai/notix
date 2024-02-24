/** @type {import('tailwindcss').Config} */

module.exports = {
    // Where tailwind css will look for files to apply css to (NO CSS FILES)
    // Be as specific as possible as it scans every file in a directory
    // Uses blob pattern
    // Visit https://tailwindcss.com/docs/content-configuration
    content: [
        './index.html',
        './src/components/**/*.{js,jsx}'
    ],
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
            }
        }
    }
}