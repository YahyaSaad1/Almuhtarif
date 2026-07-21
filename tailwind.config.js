/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      "first-color": "#0d6efd",
      "hover-first-color": "#216ad9",
      "second-color": "#F8F6F3",
      "accent-color": "#FFE836",
      "hover-accent-color": "#e9d32c",
      "hint-color": "#FD5E2B",
      "hover-hint-link": "#c1c1c1",
    },},
  },
  plugins: [],
}
