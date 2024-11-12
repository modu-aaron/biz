import dns from "dns";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VITE_ENV } from "./src/environment";

const viteEnv = process.env.VITE_ENV;

if (!viteEnv || !Object.keys(VITE_ENV).includes(viteEnv)) {
  throw new Error(`Invalid VITE_ENV: ${viteEnv}`);
}

dns.setDefaultResultOrder("verbatim");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { local, ...rest } = VITE_ENV;

if (Object.values(rest).includes(viteEnv)) {
  try {
    console.log(`Reading .env.${viteEnv} File`);
    const data = fs.readFileSync(`./config/.env.${viteEnv}`, "utf8");
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log("Not Found .env File", e.message);
    throw e;
  }
}

export default defineConfig({
  mode: viteEnv,
  envDir: "./config",
  plugins: [react()],
  server: {
    proxy: {
      "/fake_api_path": {
        target: "https://api-dev.modudev.cloud",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        rewrite: (path: string) => path.replace("/fake_api_path", ""),
      },
    },
  },
});
