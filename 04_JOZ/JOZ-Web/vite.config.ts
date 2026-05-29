import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// El visualizer se añadirá cuando se marque ANALYZE

export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react()];
  if (process.env.ANALYZE) {
    const { visualizer } = await import("rollup-plugin-visualizer");
    plugins.push(visualizer({ filename: "dist/bundle-stats.html", open: false }));
  }

  return {
    plugins,
    server: {
      port: 5173,
    },
    build: {
      // Evita la advertencia o ajústala según prefieras (KB)
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("@mui/icons-material")) return "mui-icons";
              if (id.includes("@mui/material")) return "mui-core";
              if (id.includes("@emotion")) return "mui-emotion";
              if (id.includes("@mui")) return "mui-vendor";
              if (id.includes("react")) return "react-vendor";
              return "vendor";
            }
          },
        },
      },
    },
  };
});
