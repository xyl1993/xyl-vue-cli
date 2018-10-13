<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {apiConfig} from './global/api.config';
const noAppToken = new RegExp(apiConfig.noAppToken); //'g'
export default {
  name: "app",
  components: {},
  mounted() {
    let currentRoute = this.$router.currentRoute;
    console.log('==');
    console.log(this.$router.currentRoute);
    if (!noAppToken.test(currentRoute.path) && !localStorage.getItem("app-token")) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>