import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ryeo-red': '#C20005',
        'ryeo-light': '#FFFDF3',
        'ryeo-dark': '#2C2114',
        'ryeo-accent': '#F39E00',
      },
      fontFamily: {
        alexandria: ['var(--font-alexandria)', 'sans-serif'],
      },
      lineHeight: {
        tight: '0.885',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
    },
  },
  plugins: [],
}

export default config
