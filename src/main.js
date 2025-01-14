import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import VueLazyload from "vue-lazyload";

const app = createApp(App).use(router).use(createPinia());

globalComponents(app);
utils(app);
app.use(VueLazyload, {
  loading: new URL("./assets/loading.gif", import.meta.url).href, // Placeholder while loading
  error: new URL("./assets/error.png", import.meta.url).href, // Placeholder on error
});

app.mount("#app");
