import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        host: true,
        port: 1337,
        allowedHosts: [".ngrok-free.app"],
    },
});
