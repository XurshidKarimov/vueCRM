import { db } from "@/firebase/init"
import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@firebase/auth'
import router from "@/router"
import { ref } from "vue"

export default{
  actions: {
    async login(context, {email, password}){
      try{
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
      }
      catch(e){
        router.push("/error400");
      }
    },
    async register({dispatch}, {email, password, name}){
      try{
        await createUserWithEmailAndPassword(auth, email, password, name);
        const uid = await dispatch("getUID");
        await ref(db, `users/${uid}/info`).set({
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
