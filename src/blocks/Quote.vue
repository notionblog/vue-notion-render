<template>
  <blockquote class="v_notion_blockquote">
    <Txt :p="data" />
  </blockquote>
</template>
<script>
import Txt from "./Txt.vue";
export default {
  components: {
    Txt,
  },
  props: {
    data: Array,
  },
};
</script>
<style scoped>
.v_notion_blockquote {
  margin: 0;
  border-left: 4px solid #333;
  padding: 4px 12px;
  border-radius: 4px;
}
</style>
