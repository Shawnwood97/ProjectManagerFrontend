<template>
  <div>
    <v-dialog
      v-model="laneDialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
      ><v-card>
        <v-card-title primary-title>Edit Lane</v-card-title>
        <p class="fieldHeader">Title</p>
        <v-form>
          <v-text-field
            name="editLaneTitle"
            :value="laneInfo.title"
            :id="`editLaneTitle${laneInfo.id}`"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>
          <v-btn color="success" @click="editLane">Edit</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-icon class="laneEditButton" @click="laneDialog = true"
      >mdi-square-edit-outline</v-icon
    >
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "lane-edit-button",

  props: {
    laneInfo: Object,
  },

  data() {
    return {
      laneDialog: false,
    };
  },

  methods: {
    changeLaneInfo(obj) {
      this.$emit("changeLane", obj);
    },
    openDialog() {
      this.laneDialog = true;
    },

    editLane() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/lanes`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            lane_id: this.laneInfo.id,
            title: document.getElementById(`editLaneTitle${this.laneInfo.id}`)
              .value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.changeLaneInfo(res.data);
          this.laneDialog = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.laneEditButton {
  color: $secondaryb;
}
</style>
