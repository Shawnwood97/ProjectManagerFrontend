<template>
  <div
    v-if="!taskDeleted"
    class="mainTaskContainer"
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
      <v-icon v-if="canEdit === 1" @click="deleteTask" class="taskDeleteButton"
        >mdi-trash-can-outline</v-icon
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
.mainTaskContainer {
  background: $primaryBg;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr max-content;
  margin: 6px 0;
  border-bottom: 1px solid #a3a3a3;
  padding: 6px 0 4px 8px;
  width: 100%;
  min-height: 60px;

  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
}

.buttonsContainer {
  display: none;
  margin: 0;
}
.taskDeleteButton {
  color: $redBg;
}
</style>
