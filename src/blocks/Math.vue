<template>
  <div v-html="equation"></div>
</template>
<script>
import katex from "katex";

export default {
  props: {
    data: Object,
  },
  data() {
    return {
      equation: `<span>${this.data.equation}</span>`,
    };
  },
  mounted() {
    try {
      const rendered = katex.renderToString(this.data.equation, {
        throwOnError: false,
      });
      this.equation = rendered;
    } catch (err) {}
  },
};
</script>
