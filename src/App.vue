<template>
  <div class="h-100">
    <transition>
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "./components/hub-component";
// @Component({
//   components: {},
// })
export default class App extends Vue {}
</script>

<style lang="scss">
@import "stylesheets/main.scss";
</style>
