import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        link: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
      },
      border: {
        DEFAULT: "1px",
      },
      colors: {
        border: {
          primary: "#D0D5DD",
          secondary: "#D6BBFB",
          noLinks: "#EAECF0",
        },
        background: {
          primary: "#F9FAFB",
          secondary: "#f5f5f5",
          accent: "#7F56D9",
        },
        font: {
          primary: "#344054",
          secondary: "#6941C6",
          title: "#101828",
          subtitle: "#475467",
          input: "#667085",
          error: "#de3a5b",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
