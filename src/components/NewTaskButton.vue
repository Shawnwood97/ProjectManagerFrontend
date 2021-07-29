<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
      ><v-card>
        <v-card-title primary-title>Create New Task</v-card-title>
        <p class="fieldHeader">Title</p>
        <v-form ref="taskForm">
          <v-text-field
            name="newTaskTitle"
            :id="`newTaskTitle${this.laneId}`"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>
          <p class="fieldHeader">Description</p>

          <v-text-field
            name="newTaskDesc"
            :id="`newTaskDesc${this.laneId}`"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>
          <!-- no color picker for now, not part of the createTask endpoint, will add later -->
          <!-- <p class="fieldHeader">Accent Color</p>
          <div id="inputPreview">
            <v-text-field
              name="newTaskColor"
              v-model="currentColor"
              id="newTaskColor"
              :maxlength="9"
              solo
              flat
            ></v-text-field>
            <div
              @click="toggleColorPicker"
              class="colorPreview"
              :style="{ 'background-color': currentColor }"
            ></div>
          </div>
          <v-color-picker
            id="colorPicker"
            v-if="showColorPicker"
            v-model="currentColor"
            dot-size="25"
            hide-mode-switch
            hide-inputs
            mode="hexa"
            swatches-max-height="200"
          ></v-color-picker> -->
          <v-btn color="success" @click="newTask">Create Task</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <div class="newTaskButton" @click="dialog = true">New Task</div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "new-task-button",

  props: {
    laneId: Number,
  },

  data() {
    return {
      dialog: false,
      //     showColorPicker: false,
      //     currentColor: "#FFFFFF",
    };
  },

  methods: {
    changeTaskInfo(obj) {
      this.$emit("taskInfo", obj);
    },
    // toggleColorPicker() {
    //   if (this.showColorPicker === false) {
    //     this.showColorPicker = true;
    //   } else {
    //     this.showColorPicker = false;
    //   }
    // },
    newTask() {
      // while (this.currentColor.charAt(0) === "#") {
      //   this.currentColor = this.currentColor.slice(1);
      // }
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/tasks`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            lane_id: this.laneId,
            title: document.getElementById(`newTaskTitle${this.laneId}`).value,
            description: document.getElementById(`newTaskDesc${this.laneId}`)
              .value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.changeTaskInfo(res.data);
          this.$refs.taskForm.reset();
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#inputPreview {
  position: relative;
  .colorPreview {
    position: absolute;
    z-index: 9999;
    bottom: 45px;
    left: 120px;
    width: 20px;
    height: 20px;
    border: 1px solid #000;

    &:hover {
      cursor: pointer;
    }
  }
}

.newTaskButton {
  background: #f5f5f5;
  text-align: center;
  padding: 4px 0;
  border-radius: 4px;

  &:hover {
    background: $primaryBg;
    cursor: pointer;
  }
}
</style>
