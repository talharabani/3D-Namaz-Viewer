module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brass: '#956D37',
        wood: '#DDC00F',
        sand: '#C9B59B',
        cream: '#FFF9F0',
        background: '#FFFFFF',
        card: '#F5F5F5',
        border: '#E5E7EB',
        text: '#222',
        dark: '#181c1f',
        darkcard: '#23272b',
        darkborder: '#333',
        darktext: '#f5f5f5',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Merriweather', 'serif'],
        body: ['Inter', 'Poppins', 'Roboto', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.04)',
        button: '0 1px 3px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
