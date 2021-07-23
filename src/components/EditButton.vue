<template>
  <div>
    <span v-if="buttonInfo.showForm">Submit</span>
    <span href="#" v-else>Edit</span>
  </div>
</template>

<script>
export default {
  name: "edit-button",

  props: {
    buttonInfo: Object,
  },
};
</script>

<style lang="scss" scoped>
span {
  text-decoration: underline;
  cursor: pointer;
}
</style>
