import { getDatabase, ref, get, child} from "firebase/database";


export default{
    state: {
        info: {

        }
    },
    mutations: {
        setInfo(state, info){
            state.info = info;
        },
        clearInfo(state){
            state.info = {};
        }
    },  
    actions: {
        async fetchInfo({dispatch, commit}){
            const uid = await dispatch('getUID');
            const dbRef = ref(getDatabase());
            get(child(dbRef, `/users/${uid}/info`)).then(snapshot => {
                commit('setInfo', snapshot.val());
            })
        }
    },
    getters: {
        getInfo(state){
            return state.info;
        }
    }
}