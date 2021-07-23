<template>
  <main>
    <sidebar />
    <div>
      <project-list />
      <other-project-list />
    </div>
  </main>
</template>

<script>
import OtherProjectList from "../components/OtherProjectList.vue";
import ProjectList from "../components/ProjectList.vue";
import Sidebar from "../components/Sidebar.vue";
export default {
  components: { ProjectList, OtherProjectList, Sidebar },
  name: "dashboard",
};
</script>

<style lang="scss">
main {
  display: grid;
  grid-template-columns: 280px 1fr;
}

.mainDashPanel {
  border: 1px solid #000;
  margin: 5px;

  .panelTitle {
    border: 1px solid #000;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .projectContainer {
    margin: 2px;
    padding: 5px;
    border: 1px solid #000;
  }
}
</style>
