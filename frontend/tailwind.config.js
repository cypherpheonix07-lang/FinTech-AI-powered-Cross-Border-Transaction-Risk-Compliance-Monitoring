/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#020617', // Deeper background
          800: '#0f172a', // Main background
          700: '#1e293b', // Card/Panel background
          600: '#334155',
        },
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        },
        risk: {
          low: '#16a34a',    // Green
          medium: '#f59e0b', // Amber
          high: '#dc2626',   // Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
