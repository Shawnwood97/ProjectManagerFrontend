<template>
  <main>
    <div>
      <div class="titleEditGrid">
        <h1 id="projectTitle" v-if="!buttonInfo.showForm">
          {{ projectInfo.title }}
        </h1>
        <v-form v-else>
          <v-text-field
            name="editTitle"
            id="editTitle"
            :maxlength="100"
            :value="projectInfo.title"
            solo
            flat
            counter
            autofocus
          ></v-text-field>
          <v-btn color="success" @click="editTitle">Submit</v-btn>
        </v-form>
        <span
          id="projectEditButton"
          v-if="projectInfo.can_edit === 1 && buttonInfo.showForm === false"
          @click="swapButton"
          >Edit</span
        >
        <span
          id="projectCancelButton"
          v-if="projectInfo.can_edit === 1 && buttonInfo.showForm === true"
          @click="swapButton"
          >Cancel</span
        >
      </div>
      <div>
        <draggable
          class="laneGrid"
          :list="sortedLanes"
          group="lanes"
          @change="moveLane"
          :disabled="projectInfo.can_edit !== 1"
        >
          <project-lane
            v-for="lane in sortedLanes"
            :key="lane.id"
            :laneInfo="lane"
            :canEdit="projectInfo.can_edit"
        /></draggable>
      </div>
      <new-lane-button
        v-if="projectInfo.can_edit === 1"
        @laneInfo="addLaneInfo"
        :projectId="projectInfo.id"
        :canEdit="projectInfo.can_edit"
      />
    </div>
    <invite-user
      v-if="projectInfo.can_edit === 1"
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
      sortedLanes: [],
      buttonInfo: {
        showForm: false,
      },
    };
  },

  methods: {
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
.titleEditGrid {
  display: grid;
  grid-template-columns: max-content min-content;
  place-items: center;
}

#editTitle {
  font-size: 2em;
  font-weight: bold;
  width: 550px;
  margin-top: 10px;
}
.laneGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
.laneContainer {
  border: 1px solid #000;
  margin: 4px;
}
.laneTitle {
  border: 1px solid #000;
  padding: 2px 4px;
}

.taskContainer {
  display: grid;
  grid-template-columns: 1fr min-content;
  border: 1px solid #000;
  margin: 4px;
  padding: 2px;
  width: 100%;
  transition: all 2 ease-in;

  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
}
</style>
