/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505', // Deep Black
        surface: '#121212',    // Dark Gray/Black for cards
        primary: '#8b5cf6',    // Electric Purple
        secondary: '#06b6d4',  // Cyan
        accent: '#f43f5e',     // Pink
        text: '#e2e8f0',       // White/Grey text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
      }
    },
  },
  plugins: [],
}