import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))'
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
