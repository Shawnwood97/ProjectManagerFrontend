<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
      ><v-card>
        <v-card-title primary-title>Create New Lane</v-card-title>
        <p class="fieldHeader">Title</p>
        <v-form>
          <v-text-field
            name="newLaneTitle"
            id="newLaneTitle"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>
          <v-btn color="success" @click="newLane">Create Lane</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <div @click="dialog = true">Create New Lane</div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "new-lane-button",

  props: {
    projectId: Number,
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    addLaneInfo(obj) {
      this.$emit("laneInfo", obj);
    },
    newLane() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/lanes`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            project_id: this.projectId,
            title: document.getElementById("newLaneTitle").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.addLaneInfo(res.data);
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
