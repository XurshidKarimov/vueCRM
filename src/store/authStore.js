import { auth } from "@/firebase/init"
import { signInWithEmailAndPassword, signOut } from '@firebase/auth'
import router from "@/router"

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
    async logout(){
      await signOut();
    }
  }
}
