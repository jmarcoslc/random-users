<template>
  <div class="comp-filter">
    <md-field>
      <label :for="filterLabel">{{filterLabel}}</label>
      <md-select v-model="selected" :name="filterLabel" :id="filterLabel">
        <!-- //@md-selected="(selectedValue) => $emit('input', selectedValue)" -->
        <md-option v-for="(option, optionIndex) in options" :key="`filter-${filterLabel}-${optionIndex}`" :value="option.value">{{option.label}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("comp-filter", {
  data() {
    return {
      selected: undefined,
    };
  },
  props: {
    options: {},
    filterLabel: {},
  },
  methods: {},
  watch: {
    selected(newValue: any) {
      this.$emit('input', newValue);
    }
  }
});
</script>
