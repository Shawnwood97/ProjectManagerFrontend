<template>
  <div>
    <div class="laneContainer">
      <h3 class="laneTitle">{{ laneInfo.title }}</h3>

      <draggable :list="sortedTasks" group="tasks" @change="moveTask"
        ><project-task
          v-for="task in sortedTasks"
          :key="task.id"
          :taskInfo="task"
        />
      </draggable>
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
  },

  data() {
    return {
      sortedTasks: [],
    };
  },

  created() {
    let task_order = JSON.parse(this.laneInfo.task_order);
    for (let i in task_order) {
      for (let j in this.laneInfo.tasks) {
        if (task_order[i] == this.laneInfo.tasks[j].id) {
          this.sortedTasks.push(this.laneInfo.tasks[j]);
        }
      }
    }
  },
  methods: {
    moveTask(event) {
      if (event.added !== undefined) {
        axios
          .request({
            url: `${process.env.VUE_APP_API_LINK}/tasks`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data: {
              login_token: cookies.get("session").loginToken,
              task_id: event.added.element.id,
              lane_id: this.laneInfo.id,
              new_index: event.added.newIndex,
            },
          })
          .then((res) => {
            console.log(res.data);
            event.added.element.lane_id = this.laneInfo.id;
          })
          .catch((err) => {
            console.log(err.response);
          });
      }

      if (event.removed !== undefined) {
        axios
          .request({
            url: `${process.env.VUE_APP_API_LINK}/tasks`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data: {
              login_token: cookies.get("session").loginToken,
              task_id: event.removed.element.id,
              old_lane_id: this.laneInfo.id,
              old_index: event.removed.oldIndex,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }

      if (event.moved !== undefined) {
        axios
          .request({
            url: `${process.env.VUE_APP_API_LINK}/tasks`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data: {
              login_token: cookies.get("session").loginToken,
              task_id: event.moved.element.id,
              lane_id: this.laneInfo.id,
              old_lane_id: this.laneInfo.id,
              old_index: event.moved.oldIndex,
              new_index: event.moved.newIndex,
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

<style lang="scss">
// .deleteButton {
//   place-self: center;
//   display: none;
// }
</style>
