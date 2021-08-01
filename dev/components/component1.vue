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
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  font-size: 20pt;
  text-align: center;
}
</style>
