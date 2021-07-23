<template>
  <div class="mainDashPanel">
    <div v-if="projects.length > 0">
      <div class="panelTitle">Your Projects</div>
      <div v-for="project in projects" :key="project.id">
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
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
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
        params: {
          login_token: cookies.get("session").loginToken,
        },
      })
      .then((res) => {
        this.projects = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
