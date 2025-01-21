/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This will include all JS/TS files in src
  ],
  theme: {
    extend: {
      colors: {
        // You can extend colors if needed, but the default Tailwind colors
        // are already being used in your app (blue-500, red-500, green-600, etc.)
      },
      spacing: {
        // Add custom spacing if needed
      },
    },
  },
  plugins: [],
};
