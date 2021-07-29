<template>
  <div>
    <v-dialog
      v-model="delLaneDialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
      ><v-card>
        <v-card-title primary-title>Delete Lane?</v-card-title>
        <p class="fieldHeader">Are you sure you want to delete this lane?</p>
        <v-form>
          <v-btn color="success" @click="confirmDelLane">Yes</v-btn>
          <v-btn color="error" @click="toggleDialog">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-icon class="laneDeleteButton" @click="delLaneDialog = true"
      >mdi-trash-can-outline</v-icon
    >
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "lane-delete-button",

  props: {
    laneInfo: Object,
  },

  data() {
    return {
      delLaneDialog: false,
    };
  },

  created() {
    console.log(this.laneInfo);
  },
  methods: {
    deleteLaneInfo() {
      this.$emit("deleteLane");
    },
    toggleDialog() {
      if (this.delLaneDialog === false) {
        this.delLaneDialog = true;
      } else {
        this.delLaneDialog = false;
      }
    },
    confirmDelLane() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/lanes`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            project_id: this.laneInfo.project_id,
            lane_id: this.laneInfo.id,
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.laneDeleted = true;
          this.deleteLaneInfo();
          this.toggleDialog();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.laneDeleteButton {
  color: $redBg;
}
</style>
