module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#78E389",
        secondary: "#1EB893",
        "city-color": "#0085FF",
        "bg-color": "#F6F6F6",
      },
      boxShadow: {
        custom: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        "custom-hover": "0px 4px 40px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "home-banner": "url(@/assets/img/home-banner.png)",
        "hotel-banner": "url(@/assets/img/hotel-banner.png)",
        "city-banner": "url(@/assets/img/choose-city-banner.png)",
      },
      screens: {},
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
