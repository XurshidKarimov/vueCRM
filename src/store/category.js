import { getDatabase, ref, child, push, update } from "firebase/database";

export default{
    actions: {
        async createCategory({commit}, payload){
            try{
                const db = getDatabase();
                
                const upData = {
                    name: payload.name,
                    limit: payload.limit,
                }

                const newKey = push(child(ref(db), `users/${payload.userUID}/categories`)).key;

                const updates = {};

                updates[`users/${payload.userUID}/categories/${newKey}`] = upData;

                update(ref(db), updates);

                upData.id = newKey;
                
                return upData;
            }
            catch(e){
                commit('setError', e);
                throw e;
            }
        }
    }
}