/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Design tokens from color palette
        brand: '#2D6EFF',
        brandVariant: '#2B6FFB',
        accentRed: '#FE0032',
        success: '#4CB64C',
        background: {
          white: '#FFFFFF',
          light: '#F5F5F5',
        },
        border: {
          gray: '#E5E7EB',
        },
        text: {
          black: '#000000',
          dark: '#12110D',
          muted: '#5A5E60',
          light: '#828282',
          lighter: '#ACACAB',
        },
        gray: {
          100: '#E3E2E2',
          200: '#E6E6E6',
        },

        // Back-compat aliases used in current screens/components
        primary: '#2D6EFF',
        secondary: '#0EA5E9',
        successGreen: '#4CB64C',
        borderGray: '#E5E7EB',
        textBlack: '#000000',
        textGray: '#5A5E60',
        lightGray: '#F5F5F5',
        white: '#FFFFFF',
      },
      boxShadow: {
        card: '0px 2px 6px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        input: '12px',
        button: '12px',
        card: '16px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '24px',
      },
      height: {
        button: '50px',
        input: '48px',
      },
      size: {
        otp: '56px',
        avatar: '48px',
        icon: '56px',
        flag: '24px',
      },
    },
  },
  plugins: [],
};

