// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@styles": path.resolve("/home/leandro/projects/web3/d-journal", "./src/styles"),
      "@assets": path.resolve("/home/leandro/projects/web3/d-journal", "./src/assets"),
      "@components": path.resolve("/home/leandro/projects/web3/d-journal", "./src/components"),
      "@utils": path.resolve("/home/leandro/projects/web3/d-journal", "./src/utils"),
      "@web3Config": path.resolve("/home/leandro/projects/web3/d-journal", "./config/web3")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGJhc2U6IFwiLi9cIixcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBzdHlsZXNcIjogcGF0aC5yZXNvbHZlKFwiL2hvbWUvbGVhbmRyby9wcm9qZWN0cy93ZWIzL2Qtam91cm5hbFwiLCBcIi4vc3JjL3N0eWxlc1wiKSxcbiAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLnJlc29sdmUoXCIvaG9tZS9sZWFuZHJvL3Byb2plY3RzL3dlYjMvZC1qb3VybmFsXCIsIFwiLi9zcmMvYXNzZXRzXCIpLFxuICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoXCIvaG9tZS9sZWFuZHJvL3Byb2plY3RzL3dlYjMvZC1qb3VybmFsXCIsIFwiLi9zcmMvY29tcG9uZW50c1wiKSxcbiAgICAgIFwiQHV0aWxzXCI6IHBhdGgucmVzb2x2ZShcIi9ob21lL2xlYW5kcm8vcHJvamVjdHMvd2ViMy9kLWpvdXJuYWxcIiwgXCIuL3NyYy91dGlsc1wiKSxcbiAgICAgIFwiQHdlYjNDb25maWdcIjogcGF0aC5yZXNvbHZlKFwiL2hvbWUvbGVhbmRyby9wcm9qZWN0cy93ZWIzL2Qtam91cm5hbFwiLCBcIi4vY29uZmlnL3dlYjNcIilcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsV0FBVyxLQUFLLFFBQVEseUNBQXlDLGNBQWM7QUFBQSxNQUMvRSxXQUFXLEtBQUssUUFBUSx5Q0FBeUMsY0FBYztBQUFBLE1BQy9FLGVBQWUsS0FBSyxRQUFRLHlDQUF5QyxrQkFBa0I7QUFBQSxNQUN2RixVQUFVLEtBQUssUUFBUSx5Q0FBeUMsYUFBYTtBQUFBLE1BQzdFLGVBQWUsS0FBSyxRQUFRLHlDQUF5QyxlQUFlO0FBQUEsSUFDdEY7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
