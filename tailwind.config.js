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
// foo: 'radial-gradient(rgba(200,0,0,0.40) 0%, rgba(255,0,255,0.00) 100%), conic-gradient(from -90deg, #96D8BF 30deg, #6aab93 0 60deg, #40806A 0 90deg, #135743 0 120deg, #003120 0 150deg, #000000 0 180deg, #0000 0)',
