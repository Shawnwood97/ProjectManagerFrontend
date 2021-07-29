<template>
  <main id="sidebar">
    <div class="userPanel">
      <img
        id="userAvatar"
        :src="userInfo.avatar"
        :alt="userInfo.username + '\'s avatar'"
      />

      <h3 class="username">{{ userInfo.username }}</h3>
      <p class="userStatus">Status: {{ userInfo.status }}</p>
    </div>
    <div @click="logoutUser" class="logoutPanel">Logout</div>
  </main>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "side-bar",

  data() {
    return {
      userInfo: {},
    };
  },

  methods: {
    logoutUser() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/login`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
          },
        })
        .then((res) => {
          console.log(res.data);
          cookies.remove("session");
          this.$router.push("Home");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/users`,
        method: "GET",
        headers: { "Login-Token": cookies.get("session").login_token },
      })
      .then((res) => {
        console.log(res.data);
        this.userInfo = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss" scoped>
#sidebar {
  display: grid;
  grid-template-rows: repeat(min-content);
  background: $secondaryb;
  color: $secondaryTx;
}

#userAvatar {
  width: 160px;
  border-radius: 50%;
}
.userPanel {
  place-self: start center;
  display: grid;
  margin-top: 20px;
  place-items: center;
  gap: 20px;
}

.logoutPanel {
  place-self: end center;
  display: grid;
  background: $redBg;
  width: 100%;
  padding: 10px 0;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: $altRedBg;
  }
}
</style>
