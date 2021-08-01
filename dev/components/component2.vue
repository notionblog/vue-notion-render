<template>
  <div>
    <p>{{ block.paragraph.text[0].plain_text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    block: Object,
  },
};
</script>

<style scoped>
div {
  padding: 10px;
  border-radius: 10px;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  font-size: 20pt;
  text-align: center;
}
</style>
