import { createBootstrap } from "bootstrap-vue-next";

export function setupPlugins(app) {
  app.use(createBootstrap());
}
