<script>
import "prismjs/themes/prism.css";
import "katex/dist/katex.css";
import Vue from "vue";
import VueNotionRender from "@/vue-notion-render.vue";
export default Vue.extend({
  name: "ServeDev",
  components: {
    VueNotionRender,
  },
  data() {
    return {
      customBlocks: [
        {
          blockId: "fe30b1ce-84a7-47b3-abe1-b3448b989115",
          componentName: "Component1",
        },
        {
          blockId: "305fed49-f7e8-412f-80a1-b32e2bbd5a01",
          componentName: "Component2",
        },
      ],
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
      "https://beta.notiontoblog.workers.dev/v1/page/f36a63918d1246909206813dcec928ea"
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
    <vue-notion-render :unofficial="true" :data="data" :custom="customBlocks" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
#app {
  font-family: "Nunito", sans-serif;
  width: 1080px;
  margin: auto;
}
.container {
  width: 1000px;
  margin: auto;
  overflow: hidden;
}
</style>
