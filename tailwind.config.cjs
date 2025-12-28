/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",   // Orange (Energy/Devotion)
        secondary: "#ef4444", // Red (Power/Action)
        danger: "#dc2626",    // Darker Red (Alerts)
        light: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
