<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted() {}
};
</script>

<style lang="scss">
@import "./app.scss";
</style>