<template>
  <a :href="data.src">
    🔗 <span>{{ data.title }}</span>
  </a>
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>
<style scoped>
a {
  color: inherit;
  text-decoration: inherit;
}
</style>
