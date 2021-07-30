<template>
  <v-app>
    <v-main>
      <div id="mainGrid">
        <sidebar v-if="this.$route.name !== 'Home'" />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import cookies from "vue-cookies";
import Sidebar from "./components/Sidebar.vue";
export default {
  components: { Sidebar },
  name: "App",

  data: () => ({
    userInfoCookie: cookies.get("session"),
  }),
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
  grid-auto-flow: column;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}
</style>
