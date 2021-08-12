<template>
  <div id="header">
    <h2 id="logo">KAN<span>Manager</span></h2>
    <div id="headerSpacer"></div>
    <div v-if="userInfo.avatar != undefined" class="userInfo">
      <img
        @click="showUserPanel = !showUserPanel"
        id="userAvatar"
        :src="userInfo.avatar"
        :alt="userInfo.username + '\'s avatar'"
      />
      <user-info-panel v-if="showUserPanel" :userInfo="userInfo" />
    </div>
  </div>
</template>

<script>
import UserInfoPanel from "./UserInfoPanel.vue";
export default {
  components: { UserInfoPanel },
  name: "main-header",

  data() {
    return {
      showUserPanel: false,
    };
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  place-items: center;
  background: $secondaryb;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  padding: 6px 12px;

  #logo {
    color: $secondaryTx;

    span {
      font-style: italic;
      font-weight: 500;
    }
  }

  .userInfo {
    display: grid;
    place-items: center;
    position: relative;
    #userAvatar {
      width: 36px;
      border-radius: 50%;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
