<template>
  <div
    v-if="!taskDeleted"
    class="mainContainer"
    @mouseover="showButtons(true)"
    @mouseleave="showButtons(false)"
  >
    <div
      class="taskContainer"
      v-if="!taskDeleted"
      @mousedown="showButtons(false)"
      @mouseup="showButtons(true)"
    >
      <div>
        <div>{{ thisTaskInfo.title }}</div>
        <div>{{ thisTaskInfo.description }}</div>
      </div>
    </div>
    <div :id="`btn${thisTaskInfo.id}`">
      <task-edit
        v-if="canEdit === 1"
        @changeTask="changeTaskInfo"
        :taskInfo="thisTaskInfo"
        class="taskButtons"
      />
      <span v-if="canEdit === 1" @click="deleteTask" class="taskButtons"
        >Delete</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import TaskEdit from "./TaskEdit.vue";
export default {
  components: { TaskEdit },
  name: "project-task",

  props: {
    taskInfo: Object,
    canEdit: Number,
  },

  data() {
    return {
      taskDeleted: false,
      thisTaskInfo: this.taskInfo,
    };
  },

  mounted() {
    document.getElementById(`btn${this.taskInfo.id}`).style.display = "none";
  },

  methods: {
    changeTaskInfo(data) {
      this.thisTaskInfo = data;
    },
    showButtons(val) {
      let buttonsContainer = document.getElementById(`btn${this.taskInfo.id}`);

      if (val === true) {
        buttonsContainer.style.display = "block";
      } else {
        buttonsContainer.style.display = "none";
      }
    },
    deleteTask() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/tasks`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            task_id: this.taskInfo.id,
            lane_id: this.taskInfo.lane_id,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.taskDeleted = true;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mainContainer {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr min-content;
}

.buttonsContainer {
  display: none;
}
.taskButtons {
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
