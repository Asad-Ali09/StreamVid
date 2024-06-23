import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "rgb(108, 82, 238)",
          70: "rgba(108, 82, 238, 0.7)",
        },
        textlight: "#cccdd2",
        btnBgColor: "#9e61ff",
        btnBgColor2: "#619bff",
        btnBgColor3: "#6c52ee",
        navBgColor: {
          DEFAULT: "#00031C",
          70: "rgba(0, 3, 28, 0.7)",
          50: "rgba(0, 3, 28, 0.7)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
