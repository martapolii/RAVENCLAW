import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
  plugins: [react()],
  base: "/RAVENCLAW/", // Use "/" for local dev and "/RAVENCLAW/" for GitHub Pages
  root: "./", //ensure root is set to where index.html is located
  build: {
    outDir: "dist", //specifies output directory (attempt to fix index.html not populating in dist folder) - worked! 
    manifest: true,
    rollupOptions: {
        input: path.resolve(__dirname, "index.html"), //explicitly define the entry file for the app
    },
  },
  };
});
