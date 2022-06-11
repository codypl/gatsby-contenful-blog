module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nord0: 'var(--color-nord0)',
        nord1: 'var(--color-nord1)',
        nord2: 'var(--color-nord2)',
        nord3: 'var(--color-nord3)',
        nord4: 'var(--color-nord4)',
        nord5: 'var(--color-nord5)',
        nord6: 'var(--color-nord6)',
        nord7: 'var(--color-nord7)',
        nord8: 'var(--color-nord8)',
        nord9: 'var(--color-nord9)',
        nord10: 'var(--color-nord10)',
        nord11: 'var(--color-nord11)',
        nord12: 'var(--color-nord12)',
        nord13: 'var(--color-nord13)',
        nord14: 'var(--color-nord14)',
        nord15: 'var(--color-nord15)',

        interface: 'var(--color-interface)',
        border: 'var(--color-border)',
      },
      textColor: {
        default: 'var(--color-text)',
      },
      backgroundColor: {
        default: 'var(--color-background)',
      },
    }
  },
  plugins: [require('tailwindcss-font-inter')]
}
