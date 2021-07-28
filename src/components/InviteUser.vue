<template>
  <div id="formContainer">
    <p class="fieldHeader">Invite Someone</p>
    <v-form>
      <v-text-field
        name="userInvInput"
        id="userInvInput"
        placeholder="username"
        :maxlength="30"
        solo
        flat
      ></v-text-field>
      <v-text-field
        name="roleId"
        id="roleId"
        placeholder="Role"
        :maxlength="2"
        solo
        flat
      ></v-text-field>
      <v-btn color="success" @click="newInvite">Invite</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "invite-user",

  props: {
    projectId: Number,
  },

  methods: {
    newInvite() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/project/invite`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            project_id: this.projectId,
            username: document.getElementById("userInvInput").value,
            role_id: Number(document.getElementById("roleId").value),
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.fieldHeader {
  margin-top: 20px;
}

#formContainer {
  width: 400px;
}
</style>
