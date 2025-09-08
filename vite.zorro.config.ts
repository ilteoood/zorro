import { join, resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: __dirname,
  base: "./",
  build: {
    emptyOutDir: false,
    reportCompressedSize: false,
    minify: true,
    sourcemap: false,
    lib: {
      entry: resolve(join(__dirname, "src", "zorro", "zorro.ts")),
      name: "zorro",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
