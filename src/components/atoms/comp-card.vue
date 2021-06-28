<template>
  <div class="comp-card">
    <md-card class="card">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ name }}</div>
          <div class="md-subhead">{{ email }}</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-content>
        <ul>
          <li v-if="gender">
            Género: {{ gender }}
          </li>
          <li v-if="nationality">
            Nacionalidad: {{nationality}}
          </li>
          <li v-if="bornDate">
            Fecha de Nacimiento: {{bornDate}}
          </li>
          <li v-if="registerDate">
            Fecha de Registro: {{registerDate}}
          </li>
        </ul>
      </md-card-content>

      <md-card-actions>
        <md-button class="btn md-primary md-raised" @click="moreInfo">Más información</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("comp-card", {
  data() {
    return {};
  },
  props: {
    name: {},
    email: {},
    gender: {},
    nationality: {},
    bornDate: {},
    registerDate: {},
    userId: {},
  },
  methods: {
    moreInfo() {
      this.$router.push(`detail/${this.userId}`)
    }  
  },
});
</script>
