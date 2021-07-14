<template>
  <details>
    <summary><Txt :p="summary"/></summary>
    <slot></slot>
  </details>
</template>
<script>
import Txt from "./Txt.vue";

export default {
  name: "toggle",
  components: {
    Txt,
  },
  props: {
    summary: Array,
  },
};
</script>

<style scoped>
.toggle {
  @apply pl-4 mt-1;
}
</style>
