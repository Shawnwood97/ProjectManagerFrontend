<template>
  <div class="mainDashPanel">
    <div class="panelTitle">Your Projects</div>
    <div v-if="projects.length > 0">
      <div class="projectLink" v-for="project in projects" :key="project.id">
        <router-link
          :to="{
            name: 'project',
            params: { id: project.id },
          }"
          ><div class="projectContainer">{{ project.title }}</div></router-link
        >
      </div>
    </div>
    <div v-else class="projectContainer">No Projects</div>
    <div class="btnGrid">
      <new-project-button />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import NewProjectButton from "./NewProjectButton.vue";
export default {
  components: { NewProjectButton },
  name: "project-list",

  data() {
    return {
      projects: {},
    };
  },

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/projects/owned`,
        method: "GET",
        headers: { "Login-Token": cookies.get("session").login_token },
      })
      .then((res) => {
        this.$store.commit("setUserProjects", res.data);
        this.projects = this.$store.state.userProjects;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
