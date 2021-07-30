<template>
  <main id="homeGrid">
    <div class="splashContainer">
      <div id="splashText">PLAN YOUR <span>PROJECTS</span></div>
      <img
        src="@/assets/images/splash.jpg"
        alt="Home splash image for kanmanager of person drafting a project on paper"
      />
    </div>
    <div id="mainContainer">
      <div id="logo">KAN<span>Manager</span></div>
      <div id="formContainer">
        <v-tabs
          class="tabsContainer"
          color="primary"
          slider-color="primary"
          slider-size="3"
        >
          <v-tab class="formTabs">Login</v-tab>
          <v-tab-item class="tabItem">
            <v-form class="formGrid">
              <v-text-field
                v-model="username"
                name="username"
                label="Username"
                id="usernameInput"
                autocomplete="on"
                outlined
                autofocus
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                name="password"
                label="Password"
                id="passwordInput"
                autocomplete="off"
                outlined
              ></v-text-field>
              <v-btn
                color="primary"
                :disabled="btnLoading || loginDisabled"
                @click="loginUser"
                >Login</v-btn
              >
            </v-form>
          </v-tab-item>
          <v-tab class="formTabs">Register</v-tab>

          <v-tab-item>
            <v-form class="formGrid">
              <v-text-field
                type="email"
                v-model="emailReg"
                :rules="emailRule"
                :min="8"
                maxlength="250"
                name="emailReg"
                label="Email"
                id="emailInputReg"
                autocomplete="on"
                required
                autofocus
                outlined
              ></v-text-field>
              <v-text-field
                name="usernameReg"
                v-model="usernameReg"
                :rules="userRule"
                :min="4"
                maxlength="30"
                minlength="4"
                label="Username"
                id="usernameInputReg"
                autocomplete="on"
                required
                outlined
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="passwordReg"
                :rules="passRule"
                :min="8"
                maxlength="250"
                name="passwordReg"
                label="Password"
                id="passwordInputReg"
                autocomplete="off"
                required
                outlined
              ></v-text-field>
              <v-btn
                color="primary"
                :disabled="btnLoading || registerDisabled"
                @click="registerUser"
                >Register</v-btn
              >
            </v-form>
          </v-tab-item>
        </v-tabs>
      </div>
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
      username: "",
      password: "",
      usernameReg: "",
      passwordReg: "",
      emailReg: "",

      userRule: [
        (v) => !!v || "Username is required",
        (v) => v.length <= 30 || "Max 30 characters",
        (v) => v.length >= 4 || "Min 4 characters",
      ],
      emailRule: [
        (v) => !!v || "Email is required",
        (v) => v.length <= 249 || "Max 250 characters",
        (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid e-mail.";
        },
      ],
      passRule: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Min 8 characters",
        (v) => v.length <= 249 || "Max 250 characters",
      ],
    };
  },

  computed: {
    loginDisabled() {
      return this.username.length < 1 || this.password.length < 1;
    },
    registerDisabled() {
      return (
        this.usernameReg.length < 4 ||
        this.passwordReg.length < 8 ||
        this.emailReg.length < 8
      );
    },
  },

  methods: {
    disableButton() {
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
      }, 1500);
    },
    loginUser() {
      this.disableButton();
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
          this.$router.push("Dashboard");
        })
        .catch((err) => {
          console.log(err.response);
          cookies.remove("session");
        });
    },
    registerUser() {
      this.disableButton();
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
          this.$router.push("Dashboard");
        })
        .catch((err) => {
          console.log(err.response);
          cookies.remove("session");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#homeGrid {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  grid-column: 1 / span 2;
  height: 100vh;

  .splashContainer {
    display: grid;
    place-items: center;
    overflow-y: hidden;
    height: 100%;
    width: 100%;
    position: relative;

    #splashText {
      display: grid;
      place-items: center;
      z-index: 999;
      position: absolute;
      color: $primaryTx;
      font-size: 68px;
      font-weight: bold;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      span {
        color: $secondaryTx;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(55%);
    }
  }
}

#mainContainer {
  display: grid;
  height: 100vh;
  width: 100%;
  position: relative;

  #logo {
    color: $altTx;
    font-size: 26px;
    margin-left: 10px;
    font-weight: bold;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    position: absolute;

    span {
      font-style: italic;
    }
  }
}
#formContainer {
  width: 350px;
  place-self: center;
  border-radius: 4px;
  border-bottom: 1px solid #c9c9c9;
}

.tabsContainer {
  border-radius: 4px;
}
.formTabs {
  width: 50%;
  font-weight: bold;
  font-size: 22px;
  border-radius: 4px;
}

.formGrid {
  display: grid;
  padding-top: 30px;
  margin: 20px;
}
</style>
