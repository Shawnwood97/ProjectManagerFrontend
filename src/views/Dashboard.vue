<template>
  <main>
    <div class="projectsGrid">
      <project-list />
      <other-project-list />
      <invited-list />
    </div>
  </main>
</template>

<script>
import InvitedList from "../components/InvitedList.vue";
import OtherProjectList from "../components/OtherProjectList.vue";
import ProjectList from "../components/ProjectList.vue";

export default {
  components: { ProjectList, OtherProjectList, InvitedList },
  name: "dashboard",
};
</script>

<style lang="scss">
.projectsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}
.mainDashPanel {
  background: $secondaryBg;
  padding: 0px 5px;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid $altTx;

  .panelTitle {
    font-weight: bold;
    font-size: 1.2rem;
    color: #515151;
  }
  .projectContainer {
    background: $primaryBg;
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
    border: 1px solid $altTx;
  }
}
</style>
