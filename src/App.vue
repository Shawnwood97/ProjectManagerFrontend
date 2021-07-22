<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import cookies from "vue-cookies";
export default {
  name: "App",

  data: () => ({
    userInfoCookie: cookies.get("session"),
  }),

  created() {},
};
</script>
