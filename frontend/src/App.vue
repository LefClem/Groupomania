<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// Components
import Home from "./views/Home.vue";

export default {
  components: {
    Home,
  },
  name: "App",
};
</script>

<style>
@import url("/Users/user/Desktop/Groupomania/frontend/src/style/normalize.css");
#app {
  width: 100%;
  box-sizing: border-box;
}
</style>
