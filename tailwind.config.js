module.exports = {
  purge: ["./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        "list-item": "2rem",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [],
};
