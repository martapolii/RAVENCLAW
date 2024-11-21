import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "./", //ensure root is set to the root of the project
  build: {
    outDir: "dist", //specifies output directory (attempt to fix index.html not populating in dist folder)
    manifest: true,
    rollupOptions: {
        input: "./index.html", //entry file for the app
    },
  },
base: "/RAVENCLAW/", // added for GitHub compatibility
});
