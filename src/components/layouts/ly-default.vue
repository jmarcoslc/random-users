<template>
  <div class="ly-default">
    <div class="header md-size-100">
      <slot name="header"/>
    </div>
    <div class="body md-size-100">
      <slot name="body"/>
    </div>
    <div class="footer md-size-100">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("ly-default", {
  data() {
    return {};
  },
  props: {},
});
</script>
