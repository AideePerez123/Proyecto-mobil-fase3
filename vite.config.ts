import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icons.svg", "pwa-icon.png"],
      manifest: {
        name: "Academia Comtrin",
        short_name: "Comtrin",
        description: "Reserva de canchas, asistencia, padrinazgo y votaciones",
        theme_color: "#10b981",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait",
        icons: [
          { src: "pwa-icon.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-icon.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"]
      }
    })
  ],
});