<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { apiConfig } from "./global/api.config";
const noAppToken = new RegExp(apiConfig.noAppToken, "g"); //'g'
export default {
  name: "app",
  components: {},
  mounted() {},
  created() {}
};
</script>

<style lang="scss">
@import "../assets/styles/app.scss";
</style>