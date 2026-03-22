import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#67e8f9',
          violet: '#a78bfa',
          ink: '#020617',
          panel: '#0f172a',
        },
      },
      boxShadow: {
        glow: '0 20px 80px rgba(34, 211, 238, 0.18)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
