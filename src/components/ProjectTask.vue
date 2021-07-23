<template>
  <div class="taskContainer">
    <div>{{ taskInfo.title }}</div>
    <div>{{ taskInfo.description }}</div>
  </div>
</template>

<script>
export default {
  name: "project-task",

  props: {
    taskInfo: Object,
  },
};
</script>

<style lang="scss" scoped></style>
