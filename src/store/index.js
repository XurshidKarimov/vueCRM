import { createStore } from "vuex";
import authStore from "./authStore";
import info from "./info";

export default createStore({
  namespaced: true,
  state: {
    error: null,
  },
  getters: {
    getError(state){
      return state.error;
    },
  },
  mutations: {
    setError(state, error){
      state.error = error;
    },
    clearError(state){
      state.error = null;
    },
  },
  modules: {
   authStore, info
  }
});
