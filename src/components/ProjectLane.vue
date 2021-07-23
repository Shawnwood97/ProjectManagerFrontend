<template>
  <div>
    <div class="laneContainer">
      <h3 class="laneTitle">{{ laneInfo.title }}</h3>

      <draggable :list="laneInfo.tasks" group="tasks" @change="moveTask"
        ><project-task
          v-for="task in laneInfo.tasks"
          :key="task.id"
          :taskInfo="task"
      /></draggable>
    </div>
  </div>
</template>

<script>
import ProjectTask from "./ProjectTask.vue";
import draggable from "vuedraggable";
import cookies from "vue-cookies";
import axios from "axios";
export default {
  components: { ProjectTask, draggable },
  name: "project-lane",

  props: {
    laneInfo: Object,
    sortedTasks: [],
  },

  methods: {
    moveTask(event) {
      if (event.added != undefined) {
        event.added.laneId = this.laneInfo.id;
        console.log(this.laneInfo.id);
        console.log(event.added);
        axios
          .request({
            url: `${process.env.VUE_APP_API_LINK}/tasks`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data: {
              login_token: cookies.get("session").loginToken,
              task_id: event.added.element.id,
              lane_id: this.laneInfo.id,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
