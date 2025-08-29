import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        basic: {
          white: "#ffffff",
          black: "#333333",
          fullBlack: "#000",
        },

        primary: {
          50: "#FFF3EB",
          100: "#FCE3CD",
          300: "#FAD4B3",
          400: "#F2C19E",
          600: "#F4AA74",
          700: "#F49E5F",
          800: "#F39049",
          900: "#EE7103",
        },

        secondary: {
          50: "#DEDEE0",
          100: "#A1A4A8",
          300: "#7A7D85",
          400: "#666A72",
          800: "#50555F",
          900: "#292F3B",
        },

        neutral: {
          10: "#F9F9F9",
          50: "#DADADA",
          100: "#CCCCCC",
          300: "#B3B3B3",
          400: "#9C9C9C",
          500: "#919191",
          600: "#626262",
          700: "#4A4A4A",
          800: "#303030",
          900: "#010101",
        },

        info: {
          100: "#EFAA3C",
          light50: "#E5F5FC",
          base100: "#017AAD",
        },

        success: {
          100: "#97D259",
          200: "#3FB65D",
          300: "#188F30",
          light50: "#EAF3EB",
          base100: "#29823B",
        },

        warning: {
          light50: "#FDF4E5",
          base100: "#E99400",
        },

        error: {
          light50: "#FCEAEA",
          base100: "#DC2020",
          100: "#D14735",
        },
        tertiary: {
          100: "#DAD7C9",
          200: "#A29A78",
        },

        others: {
          100: "#ECECEC",
          200: "#D1DAD1",
          300: "#FAFAFA",
          400: "#E7E7E7",
          500: "#EFEFEF",
          600: "#C2E8F9",
          700: "#6B6B80",
        },
      },

      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      boxShadow: {
        xs: "0px 4px 8px rgba(0, 0, 0, 0.08)",
        sm: "0px 6px 12px rgba(0, 0, 0, 0.11)",
        md: "0px 9px 18px rgba(0, 0, 0, 0.15)",
        lg: "0px 13px 37px rgba(0, 0, 0, 0.21)",
        xl: "0px 20px 56px rgba(0, 0, 0, 0.29)",
      },
    },
  },
  plugins: [],
} satisfies Config;
