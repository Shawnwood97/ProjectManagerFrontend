<template>
  <div>
    <div class="laneContainer">
      <div class="laneHeader">
        <h3 class="laneTitle">{{ thisLaneInfo.title }}</h3>
        <div :id="`laneBtn${this.laneInfo.id}`">
          <lane-edit-button
            @changeLane="changeLaneInfo"
            :laneInfo="thisLaneInfo"
            v-if="canEdit === 1"
          />
        </div>
      </div>
      <draggable
        :disabled="canEdit !== 1"
        :list="sortedTasks"
        group="tasks"
        @change="moveTask"
        ><project-task
          v-for="task in sortedTasks"
          :key="task.id"
          :taskInfo="task"
          :canEdit="canEdit"
        />
      </draggable>
      <new-task-button
        :laneId="laneInfo.id"
        @taskInfo="changeTaskInfo"
        :canEdit="canEdit"
        v-if="canEdit === 1"
      />
    </div>
  </div>
</template>

<script>
import ProjectTask from "./ProjectTask.vue";
import draggable from "vuedraggable";
import cookies from "vue-cookies";
import axios from "axios";
import NewTaskButton from "./NewTaskButton.vue";
import LaneEditButton from "./LaneEditButton.vue";
export default {
  components: { ProjectTask, draggable, NewTaskButton, LaneEditButton },
  name: "project-lane",

  props: {
    laneInfo: Object,
    canEdit: Number,
  },

  data() {
    return {
      sortedTasks: [],
      thisLaneInfo: this.laneInfo,
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
    changeTaskInfo(data) {
      this.sortedTasks.push(data);
    },
    changeLaneInfo(data) {
      this.thisLaneInfo = data;
    },
    moveTask(event) {
      if (event.added !== undefined) {
        axios
          .request({
            url: `${process.env.VUE_APP_API_LINK}/tasks`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data: {
              login_token: cookies.get("session").login_token,
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
              login_token: cookies.get("session").login_token,
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
              login_token: cookies.get("session").login_token,
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
.laneHeader {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr max-content;
}
</style>
