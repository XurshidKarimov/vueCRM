import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@firebase/auth'
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
        // console.log(e.code);
      }
    },
    async register({dispatch}, {email, password, name}){
      try{
        await createUserWithEmailAndPassword(auth, email, password, name);
        const uid = await dispatch("getUID");
        const db = getDatabase();
        set(ref(db, `users/${uid}/info`), {
          bill: 10000,
          name,
        })
        router.push('/');
      }
      catch(e){
        console.log(e);
      }
    },
    getUID(){
      const user = auth.currentUser;
      return user ? user.uid : null
    },
    async logingout(){
      await signOut();
    }
  }
}
