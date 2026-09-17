/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#07182F',
          navyDark: '#040F1E',
          navySecondary: '#0D2342',
          blue: '#3478F6',
          brightBlue: '#168BFF',
          purple: '#7257FF',
          cyan: '#25C5E8',
          success: '#16B364',
          warning: '#F79009',
          danger: '#F04438',
          bg: '#F7F9FC',
          card: '#FFFFFF',
          border: '#E4EAF2',
          text: '#101828',
          secondaryText: '#475467',
          muted: '#667085',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(7, 24, 47, 0.05)',
        'floating': '0 12px 32px -4px rgba(7, 24, 47, 0.12)',
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.05)',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'input': '10px',
      },
    },
  },
  plugins: [],
};
