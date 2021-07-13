<template>
  <div id="tweet" style="display:block; overflow:hidden">
    <div v-if="isLoading">Loading tweet</div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    const tweetId = this.src.split("/")[5].split("?")[0];
    window.twttr?.ready(function(twttr) {
      twttr?.widgets
        .createTweet(tweetId, document.getElementById("tweet"), {
          align: "left",
        })
        .then(function() {});
    });
    this.isLoading = false;
  },
};
</script>
