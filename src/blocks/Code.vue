<template>
  <pre><code :class="csslanguage">{{code}}</code></pre>
</template>
<script>
import Prism from "prismjs";
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
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>
span {
  color: inherit !important;
}
</style>
