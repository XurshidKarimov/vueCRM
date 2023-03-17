import { createStore } from "vuex";
import authStore from "./authStore";

export default createStore({
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  modules: {
   authStore
  }
});
