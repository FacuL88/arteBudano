import { defineConfig } from "vite";

export default defineConfig({
    base: "/",
    build: {
        minify: true,
        sourcemap: false,
        outDir: "dist"
    },
    server: {
        port: 3000,
        host: true
    }
})