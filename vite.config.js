import vue from "@vitejs/plugin-vue";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@apis",
        replacement: path.resolve(__dirname, "src/apis"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@plugins",
        replacement: path.resolve(__dirname, "src/plugins"),
      },
      {
        find: "@routes",
        replacement: path.resolve(__dirname, "src/routes"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: "@util",
        replacement: path.resolve(__dirname, "src/util"),
      },
      {
        find: "@views",
        replacement: path.resolve(__dirname, "src/views"),
      },
    ],
  },
});
