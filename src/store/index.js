import { createStore,  } from "vuex";
import authStore from "./authStore";
import info from "./info";


export default createStore({
  namespaced: true,
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
  actions: {
    async fetchCurrency(){
      let myHeaders = new Headers();
      const key = process.env.VUE_APP_FIXER;
      myHeaders.append("apikey", key);
      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      }
  
      const result = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=UZS&base=EUR`, requestOptions);
      return await result.json();
    }
  },
  modules: {
   authStore, info
  }
});
