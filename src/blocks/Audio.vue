<template>
  <audio controls>
    {{ data }}
    <source :src="data.src" />
    Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>
