/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Flowbite React components
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',      // Flowbite core components
    './index.html',                                      // Include HTML file
    './src/**/*.{js,jsx,ts,tsx}',                        // Source files (components, pages, etc.)
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Menambahkan font Poppins
      },
      animation: {
        marquee: "marquee 10s linear infinite", // Animasi berjalan
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite Tailwind plugin
  ],
};







