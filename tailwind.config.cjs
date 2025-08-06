module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Islamic color palette
        brass: '#956D37',
        wood: '#DDC00F',
        sand: '#C9B59B',
        cream: '#FFF9F0',
        
        // Background colors
        background: '#FFFFFF',
        card: '#F5F5F5',
        border: '#E5E7EB',
        
        // Text colors
        text: '#222',
        mocha: '#2D2A24', // Dark brown text
        ivory: '#F5F5F5', // Light text
        
        // Dark theme colors
        dark: '#181c1f',
        darkcard: '#23272b',
        darkborder: '#333',
        darktext: '#f5f5f5',
        
        // Accent colors for highlights and special elements
        accent: '#00C9A7', // Teal accent
        accent2: '#B5A642', // Gold accent
        accent4: '#8B7355', // Brown accent
        
        // Glass morphism and overlay colors
        glass: 'rgba(255, 255, 255, 0.8)',
        'glass-dark': 'rgba(35, 39, 43, 0.8)',
        
        // Status and priority colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Merriweather', 'serif'],
        body: ['Inter', 'Poppins', 'Roboto', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.04)',
        button: '0 1px 3px 0 rgba(0,0,0,0.08)',
        'vibrant': '0 0 20px rgba(181, 166, 66, 0.3)',
        'glassmorph': '0 8px 32px 0 rgba(31,38,135,0.15)',
      },
      borderRadius: {
        xl: '1rem',
        full: '9999px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideIn': 'slideIn 0.3s ease-out',
        'pulse-wave': 'pulse 2s infinite',
        'azan-pulse': 'azanPulse 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        azanPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 0 #B5A642)' },
          '50%': { transform: 'scale(1.2)', filter: 'drop-shadow(0 0 12px #B5A642)' }
        }
      },
    },
  },
  plugins: [],
};
