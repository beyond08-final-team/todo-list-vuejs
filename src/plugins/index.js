import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";

export function setupPlugins(app) {
  app.use(createBootstrap());
  app.use(createPinia());
}
