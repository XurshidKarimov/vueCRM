import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from '@firebase/auth'
import router from "@/router"
import { getDatabase, ref, set } from "firebase/database";


export default{
  actions: {
    async login({commit}, {email, password}){
      try{
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
      }
      catch(e){
        commit('setError', e);
      }
    },
    async register({commit, getters}, {email, password, name}){
      try{
        await createUserWithEmailAndPassword(auth, email, password, name);
        const db = getDatabase();
        set(ref(db, `users/${getters.getUserUID}/info`), {
          bill: 10000,
          name,
        })
        router.push('/login');
      }
      catch(e){
        commit('setError', e);
      }
    },
    async getUID({commit}){
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if(user){
          const userUID = user.uid;
          commit('setUID', userUID);
        }
      })
      
    },
    async logingout({commit}){
      await signOut();
      commit('clearInfo');
    },
  }
}
