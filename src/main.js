import "@assets/scss/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "@plugins";
import { createPinia } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

setupPlugins(app);

app.config.globalProperties.axios = axios;
app.mount("#app");
