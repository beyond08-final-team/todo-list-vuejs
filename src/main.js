import "@assets/scss/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "@plugins";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
const app = createApp(App);

setupPlugins(app);

app.config.globalProperties.axios = axios;
app.mount("#app");
