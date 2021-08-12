<template>
  <main>
    <div class="titleEditGrid">
      <h1 id="projectTitle" v-if="!buttonInfo.showForm">
        {{ projectInfo.title }}
      </h1>
      <v-form v-else>
        <v-text-field
          name="editTitle"
          id="editTitle"
          :maxlength="50"
          :value="projectInfo.title"
          solo
          hide-details="true"
          flat
          autofocus
        ></v-text-field>
        <div class="editBtnContainer">
          <v-btn id="projectSubmitButton" @click="editTitle">Submit</v-btn>
          <v-btn
            id="projectCancelButton"
            v-if="projectInfo.can_edit === 1 && buttonInfo.showForm === true"
            @click="swapButton"
            >Cancel</v-btn
          >
        </div>
      </v-form>
      <span
        id="projectEditButton"
        v-if="projectInfo.can_edit === 1 && buttonInfo.showForm === false"
        @click="swapButton"
        ><v-icon id="projectEditIcon">mdi-square-edit-outline</v-icon></span
      >
    </div>

    <div class="mainGrid">
      <div>
        <draggable
          draggable=".projectLane"
          class="laneGrid"
          :list="sortedLanes"
          group="lanes"
          @change="moveLane"
          :disabled="projectInfo.can_edit !== 1"
        >
          <project-lane
            class="projectLane"
            v-for="lane in sortedLanes"
            :key="lane.id"
            :laneInfo="lane"
            :canEdit="projectInfo.can_edit" />
          <new-lane-button
            v-if="projectInfo.can_edit === 1"
            @laneInfo="addLaneInfo"
            :projectId="projectInfo.id"
            :canEdit="projectInfo.can_edit"
        /></draggable>
      </div>
    </div>
    <div
      v-if="projectInfo.can_edit === 1"
      id="inviteUserButton"
      @click="toggleInviteForm"
    >
      <v-icon class="addUserIcon">mdi-account-plus</v-icon>
    </div>
    <invite-user
      class="inviteUserForm"
      v-if="projectInfo.can_edit === 1 && showInviteForm"
      :projectId="projectInfo.id"
    />
  </main>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import draggable from "vuedraggable";
import ProjectLane from "../components/ProjectLane";
import NewLaneButton from "../components/NewLaneButton.vue";
import InviteUser from "../components/InviteUser.vue";

export default {
  components: { ProjectLane, NewLaneButton, InviteUser, draggable },
  name: "project",

  data() {
    return {
      projectInfo: {},
      showInviteForm: false,
      sortedLanes: [],
      buttonInfo: {
        showForm: false,
      },
    };
  },

  methods: {
    toggleInviteForm() {
      if (this.showInviteForm === false) {
        this.showInviteForm = true;
      } else {
        this.showInviteForm = false;
      }
    },
    moveLane(event) {
      console.log(event);
      if (event.moved !== undefined) {
        axios
          .request({
            url: `${process.env.VUE_APP_API_LINK}/lanes`,
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data: {
              login_token: cookies.get("session").login_token,
              lane_id: event.moved.element.id,
              old_index: event.moved.oldIndex,
              new_index: event.moved.newIndex,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
    addLaneInfo(data) {
      this.sortedLanes.push(data);
    },
    swapButton() {
      if (this.buttonInfo.showForm === false) {
        this.buttonInfo.showForm = true;
      } else {
        this.buttonInfo.showForm = false;
      }
    },
    editTitle() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/project`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").login_token,
            project_id: this.projectInfo.id,
            title: document.getElementById("editTitle").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.projectInfo.title = res.data.title;
          this.buttonInfo.showForm = false;
          document.getElementById("projectEditButton").style.display = "block";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },

  created() {
    axios
      .request({
        url: `${process.env.VUE_APP_API_LINK}/project`,
        method: "GET",
        headers: { "Login-Token": cookies.get("session").login_token },
        params: {
          project_id: this.$route.params.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.projectInfo = res.data;

        let lane_order = JSON.parse(this.projectInfo.lane_order);
        for (let i in lane_order) {
          for (let j in this.projectInfo.lanes) {
            if (lane_order[i] === this.projectInfo.lanes[j].id) {
              this.sortedLanes.push(this.projectInfo.lanes[j]);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
};
</script>

<style lang="scss">
.mainGrid {
  display: grid;
  margin: 0 4px;
  position: relative;
}

#projectTitle {
  color: $altTx;
  text-transform: uppercase;
}
.titleEditGrid {
  display: grid;
  grid-template-columns: max-content min-content max-content;
  place-items: center;
  background: $secondaryBg;
  border-bottom: 1px solid #c9c9c9;
  padding: 10px;
}

#editTitle {
  font-size: 2em;
  font-weight: bold;
  width: 600px;
}

.editBtnContainer {
  display: grid;
  grid-template-columns: max-content max-content;
  place-items: center;
  margin-top: 10px;
  gap: 10px;

  #projectSubmitButton {
    @include priButton;
  }
  #projectCancelButton {
    @include cancelButton;
  }
}
.laneGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin-top: 10px;
}
.laneContainer {
  margin: 4px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #c9c9c9;
  background: $secondaryBg;
}
.laneTitle {
  padding: 2px 4px;
  color: $altTx;
  font-weight: 500;
  font-size: 1.1rem;
  text-transform: uppercase;
}

#projectEditIcon {
  color: $secondaryb;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
}

#inviteUserButton {
  display: grid;
  place-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  @include priButton;
  border-radius: 50%;
  height: 60px;
  width: 60px;

  .addUserIcon {
    color: $primaryTx;
  }
}
.inviteUserForm {
  position: fixed;
  bottom: 100px;
  right: 20px;
}
</style>
