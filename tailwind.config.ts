import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365c", // Azul principal - PANTONE 534 C
          dark: "#0f1f35",
          light: "#2a4a6c",
        },
        accent: {
          light: "#d8e1e2", // Gris claro - PANTONE 7541 C
          DEFAULT: "#d8e1e2",
        },
        orange: {
          DEFAULT: "#d76018", // Naranja - PANTONE 159 C
          light: "#e87a3a",
          dark: "#b84d0e",
        },
        green: {
          DEFAULT: "#5c7f71", // Verde azulado - PANTONE 5555 C
          light: "#7a9d8d",
          dark: "#4a6659",
        },
        brown: {
          DEFAULT: "#6e4f47", // Marrón - PANTONE 7518 C
          light: "#8d6b61",
          dark: "#5a3f38",
        },
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'particle-float': 'particleFloat 20s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'scale-pulse': 'scalePulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(216, 225, 226, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(216, 225, 226, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(215, 96, 24, 0.4), 0 0 40px rgba(215, 96, 24, 0.2)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(215, 96, 24, 0.8), 0 0 80px rgba(215, 96, 24, 0.4)',
            transform: 'scale(1.05)',
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(100vh) translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) translateX(100px) rotate(360deg)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

