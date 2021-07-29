<template>
  <div class="mainDashPanel">
    <div class="panelTitle">Your Project Invites</div>
    <!-- <div class="invitedProjectContainer" v-if="projects.length > 0">
      <div>Project</div>
      <div>Onwer</div>
      <div>Role</div>
      <div>Action</div>
    </div> -->
    <div class="projectContainer" v-if="projects.length <= 0">No Invites</div>
    <div v-for="project in projects" :key="project.id">
      <div class="indInvitedProject">
        <div>{{ project.title }}</div>
        <div class="usernameRole">
          <div class="username">Owner: {{ project.username }}</div>
          <div class="role">Role: {{ project.role_name }}</div>

          <div class="invitedActions">
            <div @click="acceptInvite(project.id)">
              <v-icon class="acceptIcon">mdi-check-bold</v-icon>
            </div>
            <div @click="declineInvite(project.id)">
              <v-icon class="declineIcon">mdi-close-thick</v-icon>
            </div>
          </div>
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
        headers: { "Login-Token": cookies.get("session").login_token },
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
            login_token: cookies.get("session").login_token,
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
            login_token: cookies.get("session").login_token,
            project_id: project,
            accept_invite: 0,
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
.indInvitedProject {
  display: grid;
  background: $primaryBg;
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid $altTx;

  .usernameRole {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr max-content;
    width: 100%;
    place-items: center;
  }

  .invitedActions {
    display: grid;
    grid-auto-flow: row;
    place-self: center end;
    gap: 2px;
    .acceptIcon {
      background: #30d372;
      border-radius: 4px;
      color: #fff;
    }
    .declineIcon {
      background: #d33a30;
      border-radius: 4px;
      color: #fff;
    }

    div {
      cursor: pointer;
    }
  }
}
</style>
