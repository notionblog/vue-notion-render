<template>
  <pre><code :class="csslanguage">{{code}}</code></pre>
</template>
<script>
export default {
  props: {
    code: String,
    language: String,
  },
  computed: {
    csslanguage() {
      return `language-${this.language.toLowerCase()}`;
    },
  },
  mounted() {},
};
</script>

<style scoped>
span {
  color: inherit !important;
}
</style>
