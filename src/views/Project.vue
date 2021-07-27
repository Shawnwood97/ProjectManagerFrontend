<template>
  <main>
    <div>
      <div class="titleEditGrid">
        <h1 v-if="!buttonInfo.showForm">{{ projectInfo.title }}</h1>
        <v-form v-else>
          <v-text-field
            name="editTitle"
            v-model="projectInfo.title"
            id="editTitle"
            :maxlength="100"
            solo
            flat
            counter
            autofocus
          ></v-text-field>
          <v-btn color="success" @click="editTitle">Submit</v-btn>
        </v-form>
        <span v-if="projectInfo.can_edit === 1" @click="swapButton">Edit</span>
      </div>
      <div class="laneGrid">
        <project-lane
          v-for="lane in projectInfo.lanes"
          :key="lane.id"
          :laneInfo="lane"
        />
      </div>
    </div>
  </main>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import ProjectLane from "../components/ProjectLane";

export default {
  components: { ProjectLane },
  name: "project",

  data() {
    return {
      projectInfo: {},
      buttonInfo: {
        showForm: false,
      },
    };
  },

  methods: {
    swapButton() {
      this.buttonInfo.showForm = true;
    },
    editTitle() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_LINK}/project`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: {
            login_token: cookies.get("session").loginToken,
            project_id: this.projectInfo.id,
            title: document.getElementById("editTitle").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.projectInfo.title = res.data.title;
          this.buttonInfo.showForm = false;
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
        params: {
          login_token: cookies.get("session").loginToken,
          project_id: this.$route.params.id,
        },
      })
      .then((res) => {
        this.projectInfo = res.data;
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
}
</style>
