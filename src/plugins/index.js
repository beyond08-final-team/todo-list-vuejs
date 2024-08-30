import { createBootstrap } from "bootstrap-vue-next";
import mitt from "mitt";
import { createPinia } from "pinia";

const emitter = mitt();

emitter.on("*", (type, e) => console.log(`## 이벤트로그 : ${type} => `, e));

const pinia = createPinia();

export function setupPlugins(app) {
  app.config.globalProperties.emitter = emitter;
  app.use(pinia);
  app.use(createBootstrap());
}
