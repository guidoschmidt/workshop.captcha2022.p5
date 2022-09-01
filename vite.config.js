import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {},
  },
  root: path.resolve(__dirname, "./src"),
  publicDir: path.resolve(__dirname, "./public"),
  build: {
    target: "esnext",
  },
});
