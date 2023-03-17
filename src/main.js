import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";

// Import the functions you need from the SDKs you need



createApp(App).use(router).use(store).mount("#app");

