/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Josefin Sans"],
        mon: ["Montserrat"],
        pop: ["Poppins"],
      },
    },
  },
  plugins: [],
};
