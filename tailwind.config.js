module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    fontFamily: {
      Alasar: 'Alasar sans-serif',
      sharpsans: 'sharpsans, Georgia, serif'
    },
    extend: {
      colors: {},
      fontSize: {
        three: '1.3rem',
        tiny: '0.6rem'
      },
      gridTemplateRows: {
        7: '40px 1fr'
      },
      inset: {
        29: '29rem'
      }
    }
  }
}
