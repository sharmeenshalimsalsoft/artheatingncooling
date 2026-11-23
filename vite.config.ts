import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Windows locks large media while in use; watching them crashes Vite with EBUSY
      ignored: ["**/public/videos/**", "**/*.mp4"],
    },
  },
});
