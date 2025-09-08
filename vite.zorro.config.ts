import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [dts({ rollupTypes: true })],
  build: {
    outDir: "./dist",
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
