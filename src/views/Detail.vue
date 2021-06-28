<template>
  <div class="detail">
    <ly-detail>
      <div slot="header">
      </div>
      <div class="card-wrapper md-layout md-gutter" slot="body">
      </div>
      <div slot="footer">
      </div>
    </ly-detail>
    {{this.$route.params.id}}
  </div>
</template>

<script>
import compCard from "@/components/atoms/comp-card.vue";

export default {
  name: "Detail",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
