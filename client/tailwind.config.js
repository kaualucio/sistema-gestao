module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    minWidth: {
      '1/2': '50%',
      sm: '19%',
      md: '81%'
    },
    screens: {
      xs: '280px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1024px',
      xxl: '1280px'
    },
    colors: {
      red: '#ff0000',
      white: '#ffffff',
      yellow: '#f4e409',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      baseColor: '#758bfd',
      secondaryColor: '#aeb8fe',
      actionColor: '#27187e',
      whiteColor: '#F4F8FD',
      blackColor: '#2E2E2F'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        1: '0.5rem',
        2: '0.75rem',
        3: '1rem',
        4: '1.5rem',
        5: '2rem',
        6: '3rem',
        7: '4rem',
        8: '6rem',
        9: '8rem',
        10: '9rem',
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      backgroundImage: {
        wave: "url('/public/assets/images/wave.svg')",
        wave6: "url('/public/assets/images/wave6.svg')"
      }
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50%',
      16: '4rem'
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1280px',
          padding: '0 2%',
          center: true
        }
      })
    }
  ]
}
