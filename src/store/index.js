import Vue from "vue";
import Vuex from "vuex";
// import cookies from "vue-cookies";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    otherProjects: null,
    invitedProjects: null,
  },
  mutations: {
    setOtherProjects(state, data) {
      state.otherProjects = data;
    },
    setInvitedProjects(state, data) {
      state.invitedProjects = data;
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
