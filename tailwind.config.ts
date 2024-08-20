import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        backdrop: 'rgba(255, 255, 255, 0.1)'
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))'
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        'fade-slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(1rem)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0rem)'
          }
        },
        'fade-slide-up-modal': {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -50%) translateY(1rem)'
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, -50%) translateY(0rem)'
          }
        }
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 1.5s ease-out forwards',
        'fade-slide-up-modal': 'fade-slide-up-modal 1.5s ease-out forwards'
      }
    }
  },
  plugins: []
} satisfies Config;
