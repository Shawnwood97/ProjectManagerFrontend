<template>
  <main>
    <sidebar />
    <div>
      <h1>{{ projectInfo.title }}</h1>
      <div class="laneGrid">
        <project-lane
          v-for="lane in projectInfo.lanes"
          :key="lane.id"
          :laneInfo="lane"
        />
      </div>
    </div>
  </main>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import sidebar from "../components/Sidebar.vue";
import ProjectLane from "../components/ProjectLane";

export default {
  components: { sidebar, ProjectLane },
  name: "project",

  data() {
    return {
      projectInfo: {},
    };
  },

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/project`,
        method: "GET",
        params: {
          login_token: cookies.get("session").loginToken,
          project_id: this.$route.params.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.projectInfo = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss">
.laneGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
.laneContainer {
  border: 1px solid #000;
  margin: 4px;

  .laneTitle {
    border: 1px solid #000;
    padding: 2px 4px;
  }

  .taskContainer {
    border: 1px solid #000;
    margin: 4px;
    padding: 2px;
  }
}
</style>
