<template>
  <main>
    <div id="formContainer">
      <v-tabs color="primary">
        <v-tab class="formTabs">Login</v-tab>
        <v-tab-item>
          <v-form class="formGrid">
            <v-text-field
              name="username"
              label="Username"
              id="usernameInput"
              outlined
              autofocus
            ></v-text-field>
            <v-text-field
              type="password"
              name="password"
              label="Password"
              id="passwordInput"
              outlined
            ></v-text-field>
            <v-btn color="success" :disabled="btnLoading" @click="loginUser"
              >Login</v-btn
            >
          </v-form>
        </v-tab-item>
        <v-tab class="formTabs">Register</v-tab>

        <v-tab-item>
          <v-form class="formGrid">
            <v-text-field
              type="email"
              name="emailReg"
              label="Email"
              id="emailInputReg"
              outlined
            ></v-text-field>
            <v-text-field
              name="usernameReg"
              label="Username"
              id="usernameInputReg"
              outlined
            ></v-text-field>
            <v-text-field
              type="password"
              name="passwordReg"
              label="Password"
              id="passwordInputReg"
              outlined
            ></v-text-field>
            <v-btn color="success" :disabled="btnLoading" @click="registerUser"
              >Register</v-btn
            >
          </v-form>
        </v-tab-item>
      </v-tabs>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "Home",

  data() {
    return {
      btnLoading: false,
    };
  },

  components: {},

  methods: {
    loginUser() {
      this.btnLoading = true;
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          cookies.set("session", res.data);
        })
        .catch((err) => {
          console.log(err.response);
          cookies.remove("session");
        })
        .finally(() => {
          setTimeout(() => {
            this.btnLoading = false;
          }, 3000);
        });
    },
    registerUser() {
      this.btnLoading = true;
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/users`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: document.getElementById("emailInputReg").value,
            username: document.getElementById("usernameInputReg").value,
            password: document.getElementById("passwordInputReg").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          cookies.set("session", res.data);
        })
        .catch((err) => {
          console.log(err.response);
          cookies.remove("session");
        })
        .finally(() => {
          setTimeout(() => {
            this.btnLoading = false;
          }, 3000);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  display: grid;
  place-items: center;
  grid-column: 1 / span 2;
  min-height: 100vh;
}
#formContainer {
  width: 300px;
}
.formTabs {
  width: 50%;
}
.formGrid {
  display: grid;
  padding-top: 30px;
}
</style>
