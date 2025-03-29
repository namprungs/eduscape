import { type Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        jersey: ["Jersey 10", "cursive"], // ชื่อฟอนต์ต้องตรงกับ Google Fonts
      },
    },
  },
  plugins: [],
};

export default config;
