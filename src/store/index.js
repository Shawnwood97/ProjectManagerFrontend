import Vue from "vue";
import Vuex from "vuex";
// import cookies from "vue-cookies";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    userProjects: null,
    otherProjects: null,
    invitedProjects: null,
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
    },
    setOtherProjects(state, data) {
      state.otherProjects = data;
    },
    setInvitedProjects(state, data) {
      state.invitedProjects = data;
    },
    setUserProjects(state, data) {
      state.userProjects = data;
    },
    createUserProject(state, data) {
      state.userProjects.push(data);
    },
    acceptProjectInvite(state, data) {
      state.otherProjects.push(data);
      state.invitedProjects.splice(data, 1);
    },
    declineProjectInvite(state, data) {
      state.invitedProjects.splice(data, 1);
    },
  },
  actions: {},
  modules: {},
});
