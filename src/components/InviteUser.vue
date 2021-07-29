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
      <v-select
        return-object
        v-model="selectedRole"
        id="roleId"
        :items="roles"
        label="Select User Role"
        item-text="name"
        item-value="value"
        dense
        flat
        solo
      ></v-select>
      <div class="inviteButton" @click="newInvite">Invite</div>
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

  data() {
    return {
      roles: [
        {
          name: "View",
          value: 1,
        },
        {
          name: "Edit",
          value: 2,
        },
      ],
      selectedRole: null,
    };
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
            role_id: this.selectedRole.value,
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
  font-weight: bold;
}

#formContainer {
  width: 400px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
}

.inviteButton {
  @include priButton;
}
</style>
