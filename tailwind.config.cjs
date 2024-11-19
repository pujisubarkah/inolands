// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',  // Add Flowbite React component paths
    './index.html',                                       // Include HTML file
    './src/**/*.{js,jsx,ts,tsx}',                          // Include your source files (e.g. components, pages, etc.)
  './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',        // Add Flowbite component paths
  ],
  theme: {
  extend: {},
  },
  plugins: [
  require('flowbite/plugin'),  // Add Flowbite Tailwind plugin
  ],
};




