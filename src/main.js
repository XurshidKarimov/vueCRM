import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import LoaderL from "@/components/app/LoaderL.vue"


const app = createApp(App);
app.component("LoaderL", LoaderL)
    .use(router).use(store).mount("#app");
