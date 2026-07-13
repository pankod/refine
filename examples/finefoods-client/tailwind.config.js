/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "system-ui"],
      },
      container: {
        center: true,
      },
      colors: {
        primary: "#fb7a32",
      },
    },
  },
  plugins: [],
};
