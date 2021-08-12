<template>
  <div id="userPanelGrid">
    <div class="userPanelHeader">logged in as</div>
    <div id="avatarUsername">
      <img
        id="userAvatar"
        :src="userInfo.avatar"
        :alt="userInfo.username + '\'s avatar'"
      />

      <span class="username">{{ userInfo.username }}</span>
    </div>

    <router-link to="/dashboard">
      <div class="userPanelLink">
        <v-icon class="panelLinkIcon">mdi-view-dashboard-outline</v-icon
        >Dashboard
      </div></router-link
    >
    <div class="userPanelLink">
      <v-icon class="panelLinkIcon">mdi-account-edit-outline</v-icon>Edit
      Profile
    </div>
    <div @click="logoutUser" class="userPanelLink">
      <v-icon class="panelLinkIcon">mdi-logout</v-icon>Logout
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "user-info-panel",

  props: {
    userInfo: Object,
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
};
</script>

<style lang="scss" scoped>
#userPanelGrid {
  display: grid;
  position: absolute;
  background: $secondaryb;
  top: 42px;
  right: 0;
  z-index: 99999;
  width: 200px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.66);

  .userPanelHeader {
    color: $primaryTx;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 600;
  }
  #avatarUsername {
    place-self: center start;
    grid-template-columns: max-content 1fr;
    display: grid;
    place-items: center;
    gap: 10px;
    border-bottom: 1px solid $secBorder;
    padding: 10px 0;
    margin-bottom: 8px;
    width: 100%;

    #userAvatar {
      width: 40px;
      border-radius: 50%;
    }

    .username {
      place-self: center start;
      font-weight: 500;
      color: $primaryb;
    }
  }
  .userPanelLink {
    width: 100%;
    place-self: center start;
    font-weight: 500;
    color: $primaryb;
    padding: 5px 0;

    .panelLinkIcon {
      color: $primaryb;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 20px;
    }
    &:hover {
      background: $hoverBg;
      border-radius: 4px;
      color: $secondaryTx;
      cursor: pointer;
    }
  }
}
</style>
