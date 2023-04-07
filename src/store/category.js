import { getDatabase, ref, child, push, update, get } from "firebase/database";

export default{
    state: {
        categories: null,
    },
    mutations: {
        setCategory(state, payload){
            state.categories = payload;
        }
    },
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
        },
        async fetchCategories(context, payload){
            const dbRef = ref(getDatabase());
            const request = await get(child(dbRef, `users/${payload}/categories`));
            
            const data = request.val();
            const resultData = Object.keys(data).map(key => ({...data[key], id: key}));
            context.commit("setCategory", resultData);
        },
    },
    getters: {
        getCategories(state){
            return state.categories;
        }
    }
}