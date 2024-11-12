/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        coverImg: "url('./assets/images/coverImg.jpg')",
      },
      screens: {
        sm: "480px", // 360px부터 적용
        md: "768px", // 768px부터 적용
        lg: "1024px", // 1024px부터 적용
        xl: "1280px", // 1280px부터 적용 (필요시 수정)
      },
    },
  },
  plugins: [],
};
