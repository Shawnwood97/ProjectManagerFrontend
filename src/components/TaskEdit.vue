<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
      ><v-card>
        <v-card-title primary-title>Edit Task</v-card-title>
        <p class="fieldHeader">Title</p>
        <v-form>
          <v-text-field
            name="editTaskTitle"
            :value="taskInfo.title"
            :id="`editTaskTitle${taskInfo.id}`"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>
          <p class="fieldHeader">Description</p>

          <v-text-field
            name="editTaskDesc"
            :value="taskInfo.description"
            :id="`editTaskDesc${taskInfo.id}`"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>

          <p class="fieldHeader">Accent Color</p>
          <div id="inputPreview">
            <v-text-field
              name="editTaskColor"
              :value="currentColor"
              :id="`editTaskColor${taskInfo.id}`"
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
          ></v-color-picker>
          <span class="taskEditButton" @click="editTask">Edit</span>
        </v-form>
      </v-card>
    </v-dialog>
    <v-icon class="taskEditButton" @click="dialog = true"
      >mdi-square-edit-outline</v-icon
    >
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "task-edit",

  props: {
    taskInfo: Object,
  },

  data() {
    return {
      dialog: false,
      showColorPicker: false,
      currentColor: "#" + this.taskInfo.accent_hex,
    };
  },

  methods: {
    changeTaskInfo(obj) {
      this.$emit("changeTask", obj);
    },
    openDialog() {
      this.dialog = true;
    },
    toggleColorPicker() {
      if (this.showColorPicker === false) {
        this.showColorPicker = true;
      } else {
        this.showColorPicker = false;
      }
    },

    editTask() {
      while (this.currentColor.charAt(0) === "#") {
        this.currentColor = this.currentColor.slice(1);
      }
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/tasks`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            task_id: this.taskInfo.id,
            lane_id: this.taskInfo.lane_id,
            title: document.getElementById(`editTaskTitle${this.taskInfo.id}`)
              .value,
            description: document.getElementById(
              `editTaskDesc${this.taskInfo.id}`
            ).value,
            accent_hex: this.currentColor,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.changeTaskInfo(res.data);
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
.taskEditButton {
  color: $secondaryb;
  padding: 0;
  margin: 0;
}
</style>
