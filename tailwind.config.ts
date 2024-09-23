import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      keyframes: {
        dialogOverlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        dialogContentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -45%) scale(0.95)'
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
        }
      },
      animation: {
        // Dialog
        dialogOverlayShow:
          'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        dialogContentShow:
          'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}
export default config
