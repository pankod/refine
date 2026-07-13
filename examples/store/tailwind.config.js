const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["outline-none"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        drawer: "580px",
        small: "1024px",
        "max-content": "1240px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      maxWidth: {
        "8xl": "1920px",
      },
      colors: {
        brand: "#0080FF",
        gray: {
          lightest: "#FFFFFF", // 0
          lighter: "#F4F8FB", // 50
          light: "#EDF2F7", // 100
          normal: "#DEE5ED", // 200
          dark: "#A3ADC2", // 400
          darker: "#6C7793", // 500
          darkest: "#14141F", // 900
        },
        primary: "var(--primary)",
        "primary-2": "var(--primary-2)",
        secondary: "var(--secondary)",
        "secondary-2": "var(--secondary-2)",
        hover: "var(--hover)",
        "hover-1": "var(--hover-1)",
        "hover-2": "var(--hover-2)",
        "accent-0": "var(--accent-0)",
        "accent-1": "var(--accent-1)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
        "accent-4": "var(--accent-4)",
        "accent-5": "var(--accent-5)",
        "accent-6": "var(--accent-6)",
        "accent-7": "var(--accent-7)",
        "accent-8": "var(--accent-8)",
        "accent-9": "var(--accent-9)",
        "product-gray": "var(--product-gray)",
        "product-gray-dark": "var(--product-gray-dark)",
        "product-blue": "var(--product-blue)",
        "product-green": "var(--product-green)",
        "product-pink": "var(--product-pink)",
        violet: "var(--violet)",
        "violet-light": "var(--violet-light)",
        "violet-dark": "var(--violet-dark)",
        pink: "var(--pink)",
        "pink-light": "var(--pink-light)",
        cyan: "var(--cyan)",
        blue: "var(--blue)",
        green: "var(--green)",
        red: "var(--red)",
      },
      textColor: {
        base: "var(--text-base)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      boxShadow: {
        "outline-normal": "0 0 0 1px #A3ADC2",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
      },
      lineHeight: {
        "extra-loose": "2.2",
      },
      scale: {
        120: "1.2",
      },
    },
  },
};
