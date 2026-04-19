import { defineConfig } from "vite";

export default defineConfig({
    base: "/",
    build: {
        minify: true,
        sourcemap: false
    },
    server: {
        port: 3000,
        host: true
    }
})