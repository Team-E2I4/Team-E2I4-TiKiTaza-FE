/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-50': '#ebffeb',
        'green-100': '#96db8f',
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
      },
    },
  },
  plugins: [],
};
