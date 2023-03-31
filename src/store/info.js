import { child, getDatabase, ref, get} from "firebase/database";

export default{
    state: {
        info: {

        },
        userUID: '',
        userDataStatus: true,
    },
    mutations: {
        setInfo(state, info){
            state.info = info;
        },
        setUID(state, info){
            state.userUID = info;
        },
        clearInfo(state){
            state.info = {};
        },
        setUserDataStatus(state){
            state.userDataStatus = !state.userDataStatus;
        }
    },
    actions: {
        async fetchInfo({commit}, payload){
            const db = getDatabase();
            const dbRef = ref(db);
            let result = await get(child(dbRef, `/users/${payload}/info`));
            commit('setInfo', result.val());
            commit('setUserDataStatus');
        },
    },
    getters: {
        getInfo(state){
            return state.info;
        },
        getUserUID(state){
            return state.userUID;
        },
        getUserDataStatus(state){
            return state.userDataStatus;
        }
    }
}