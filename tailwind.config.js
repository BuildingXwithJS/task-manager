module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
      },
      gridTemplateColumns: {
        // 1 column project layout
        'projects-layout': '4em 1fr',
        // Full 3 columns layout
        'main-layout': '4em 15em 1fr',
      },
    },
  },
  variants: {},
  plugins: [],
};
