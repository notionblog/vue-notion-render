<script>
import Vue from "vue";
import VueNotionRender from "@/vue-notion-render.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueNotionRender,
  },
  data() {
    return {
      data: {},
    };
  },
  async mounted() {
    let twitter = document.createElement("script");
    twitter.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(twitter);
  },
  async created() {
    fetch(
      "https://beta.notiontoblog.workers.dev/v1/page/28eac3eed25a47b2bcbb6bb957537f16"
    )
      .then(async (data) => {
        this.data = await data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>

<template>
  <div id="app">
    <vue-notion-render :unofficial="true" :data="data" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
#app {
  font-family: "Nunito", sans-serif;
}
.container {
  width: 1000px;
  margin: auto;
  overflow: hidden;
}
</style>
