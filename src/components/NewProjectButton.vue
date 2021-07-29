<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
      ><v-card>
        <v-card-title primary-title>Create New Project</v-card-title>
        <p class="fieldHeader">Title</p>
        <v-form>
          <v-text-field
            name="newProjectTitle"
            id="newProjectTitle"
            :maxlength="100"
            solo
            flat
            counter
          ></v-text-field>
          <v-btn color="success" @click="newProject">Create Project</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <div class="createButton" @click="dialog = true">New Project</div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "new-project-button",

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    newProject() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/project`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            title: document.getElementById("newProjectTitle").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("createUserProject", res.data);
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
.createButton {
  @include priButton;
}
</style>
