<template>
  <div class="mainDashPanel">
    <div class="panelTitle">Your Other Projects</div>
    <div v-if="projects.length > 0">
      <div v-for="project in projects" :key="project.id">
        <router-link
          :to="{
            name: 'project',
            params: { id: project.project_id },
          }"
          ><div class="projectContainer">
            {{ project.title }}
          </div></router-link
        >
      </div>
    </div>
    <div v-else class="projectContainer">No Projects</div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "other-project-list",

  data() {
    return {
      projects: {},
    };
  },

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/projects/accepted`,
        method: "GET",
        headers: { "Login-Token": cookies.get("session").login_token },
      })
      .then((res) => {
        this.$store.commit("setOtherProjects", res.data);
        this.projects = this.$store.state.otherProjects;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
