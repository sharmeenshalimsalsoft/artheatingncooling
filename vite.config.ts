import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const base = process.env.VITE_BASE?.trim() || "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Windows locks large media while in use; watching them crashes Vite with EBUSY
      ignored: ["**/public/videos/**", "**/*.mp4"],
    },
  },
});
