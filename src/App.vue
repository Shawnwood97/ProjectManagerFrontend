<template>
  <v-app>
    <v-main>
      <div id="mainGrid">
        <main-header />
        <div id="secGrid">
          <left-sidebar v-if="this.$route.name !== 'Home'" />
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import LeftSidebar from "./components/LeftSidebar.vue";
import MainHeader from "./components/MainHeader.vue";

export default {
  components: { LeftSidebar, MainHeader },
  name: "App",

  data: () => ({
    userInfoCookie: cookies.get("session"),
  }),

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/users`,
        method: "GET",
        headers: { "Login-Token": cookies.get("session").login_token },
      })
      .then((res) => {
        console.log(res.data);
        this.$store.commit("setUserInfo", res.data);
      })
      .catch(() => {
        this.$store.commit("setUserInfo", null);
      });
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  background: $primaryBg;
}

a {
  text-decoration: none;
}

#mainGrid {
  display: grid;
  min-height: 100vh;
  grid-template-rows: max-content 1fr;

  #secGrid {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 280px 1fr;
  }
}
</style>
