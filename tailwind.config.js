module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6366F1',
        dark: '#0F172A',
        'dark-2': '#1E293B',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}