<template>
  <div class="mainDashPanel">
    <div class="panelTitle">Your Project Invites</div>
    <div class="invitedProjectContainer" v-if="projects.length > 0">
      <div>Project</div>
      <div>Onwer</div>
      <div>Role</div>
      <div>Action</div>
    </div>
    <div v-else class="projectContainer">No Invites</div>
    <div v-for="project in projects" :key="project.id">
      <div class="indInvitedProject">
        <div>{{ project.title }}</div>
        <div>{{ project.username }}</div>
        <div>{{ project.role_name }}</div>
        <div class="invitedActions">
          <div @click="acceptInvite(project.id)">Y</div>
          <div @click="declineInvite(project.id)">N</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "invited-list",

  data() {
    return {
      projects: {},
    };
  },

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/project/invite`,
        method: "GET",
        params: {
          login_token: cookies.get("session").loginToken,
        },
      })
      .then((res) => {
        this.$store.commit("setInvitedProjects", res.data);
        this.projects = this.$store.state.invitedProjects;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },

  methods: {
    acceptInvite(project) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/project/invite`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").loginToken,
            project_id: project,
            accept_invite: 1,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("acceptProjectInvite", res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    declineInvite(project) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/project/invite`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").loginToken,
            project_id: project,
            accept_invite: 2,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("declineProjectInvite", res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.invitedProjectContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.3fr;
  padding: 0px 8px;
  background: gray;
}
.indInvitedProject {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.3fr;
  border: 1px solid #000;
  padding: 4px;
  margin: 4px;

  .invitedActions {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    text-decoration: underline;

    div {
      cursor: pointer;
    }
  }
}
</style>
