module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1s linear 1',
        // 'bottom-to-top': 'bottom-to-top 0.4s linear 1',
        // 'top-to-bottom': 'bottom-to-top 0.4s linear 1 reverse',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        // 'bottom-to-top': {
        //   from: {
        //     transform: 'translateY(100vh)',
        //   },
        //   to: {
        //     transform: 'translateY(0vh)',
        //   },
        // },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
    backgroundColor: theme => ({ ...theme('colors'), main: '#C24129' }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
