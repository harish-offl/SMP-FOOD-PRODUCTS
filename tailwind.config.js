/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        smp: {
          bg: '#0E0E0F',
          background: '#0E0E0F',
          surface: '#171717',
          card: '#1E1E20',
          elevated: '#262628',
          brown: '#7B3F21',
          'brown-light': '#9A5A3A',
          gold: '#D79B3A',
          green: '#2E7D32',
          leaf: '#2E7D32',
          cream: '#F5E9D8',
          white: '#FFFFFF',
          textDark: '#FFFFFF',
          text: '#B8B8B8',
          textMuted: '#7A7A7A',
          secondary: '#B8B8B8',
          muted: '#7A7A7A',
          sand: '#262628',
          accent: '#D79B3A',
          herbal: '#2E7D32',
        },
      },
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '18px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(123, 63, 33, 0.15)',
        'glow-gold': '0 0 40px rgba(215, 155, 58, 0.15)',
        card: '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.4)',
        nav: '0 8px 32px rgba(0, 0, 0, 0.4)',
        soft: '0 4px 24px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
