/**  @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-50': '#ebffeb',
        'green-70': '#D4EBE2',
        'green-100': '#96d8bf',
        'coral-50': '#FEDCDA',
        'coral-100': '#fd8d83',
        'beige-10': '#f7f5f0',
        'beige-100': '#fff4dc',
        'gray-10': '#eeeeee',
        'gray-100': '#d9d9d9',
        'gray-200': '#919191',
        'gray-300': '#585858',
        black: '#1f1f1f',
        white: '#fefeff',
        layoutBgColor: '#d9d9d9', // 추후 그림?
        bodyLayoutBgColor: '#f7f5f0',
      },
      width: {
        'layout-w': '136.6rem',
      },
      keyframes: {
        overlayShow: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        blinkTimer: {
          '50%': { color: 'red' },
        },
        neonTop: {
          '0%': {
            left: '-100%',
          },
          '50%, 100%': {
            left: '100%',
          },
        },
        neonRight: {
          '0%': {
            top: '-100%',
          },
          '50%, 100%': {
            top: '100%',
          },
        },
        neonBottom: {
          '0%': {
            right: '-100%',
          },
          '50%, 100%': {
            right: '100%',
          },
        },
        neonLeft: {
          '0%': {
            bottom: '-100%',
          },
          '50%, 100%': {
            bottom: '100%',
          },
        },
      },
      animation: {
        blinkTimer: 'blinkTimer 1s ease-in-out infinite',
        neonTop: 'neonTop 1s linear infinite 0s',
        neonRight: 'neonRight 1s linear infinite 0.25s',
        neonBottom: 'neonBottom 1s linear infinite 0.5s',
        neonLeft: 'neonLeft 1s linear infinite 0.75s',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(rgba(200,0,0,0.40) 0%,rgba(255,0,255,0.00) 100%)',
      },
      boxShadow: {
        default:
          '0 1px 3px 1px rgba(252, 252, 252, 1), -1px 6px 8px rgba(214, 215, 217, 1), 0 -2px 4px rgba(206, 207, 210, 1), 0 -6px 4px rgba(244, 245, 246, 1), inset 0 0 3px 0 rgba(206, 207, 209, 1)',
        hover:
          '0 1px 3px 1px rgba(252, 252, 252, 1), -1px 6px 8px rgba(214, 215, 217, 1), 0 -2px 4px rgba(206, 207, 210, 1), 0 -6px 4px rgba(244, 245, 246, 1), inset 0 0 3px 3px rgba(206, 207, 209, 1)',
      },
    },
  },
  plugins: [scrollbarHide],
};
