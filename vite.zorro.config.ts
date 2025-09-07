import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'README.md',
          dest: './',
        },
      ],
    }),
  ],
  build: {
    outDir: "./dist",
    emptyOutDir: false,
    reportCompressedSize: false,
    minify: true,
    sourcemap: false,
    lib: {
      entry: {
        zorro: resolve(join(__dirname, "src", "zorro", "zorro.ts")),
      },
      name: "zorro",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
