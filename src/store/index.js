import axios from 'axios'

const state={
    user_id:"",
    academy_name:'',
    getAcademy_id:"",
    searchClassName:""
}

const mutations={
    LOGINGETUSERID(state,payload){
        state.user_id=payload;
    },
    LOGINGETACADEMYNAME(state,payload){
        state.academy_name=payload;
    },
    LOGINGETACADEMYID(state,payload){
        state.getAcademy_id=payload;
    }
}

const actions={
    loginGetUserId({commit},userId){
        commit('LOGINGETUSERID',userId);
    },
    loginGetAcademyName({commit},academyName){
        commit('LOGINGETACADEMYNAME',academyName);
    },
    loginGetAcademyId({commit},academId){
        commit('LOGINGETACADEMYID',academId);
    }
}

const getters={
    getNowUserId:state=>state.user_id,
    getNowUserAcademyName:state=>state.academy_name,
    getNowUserAcademyId:state=>state.getAcademy_id,
}

const Module={
    state,
    mutations,
    actions,
    getters
}

export default Module;