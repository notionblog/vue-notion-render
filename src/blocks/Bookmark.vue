<template>
  <a :href="data.link" target="_blank" class="v_notion_bookmark">
    <div class="v_notion_bookmark_details">
      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
      <div>
        <img
          class="v_notion_bookmark_icon"
          :src="data.icon"
          width="20"
          height="20"
        />
        <span class="text-sm">{{ data.link }}</span>
      </div>
    </div>

    <img :src="data.cover" class="v_notion_thumbnail" />
  </a>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style scoped>
.v_notion_bookmark {
  display: block;
  color: inherit;
  height: 197px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
}
.v_notion_bookmark:hover {
  background: #f9f9fa;
}
.v_notion_bookmark_details {
  width: 70%;
  float: left;
}
.v_notion_bookmark_icon {
  display: inline-block;
  margin-right: 2px;
}
.v_notion_thumbnail {
  width: 30%;
  float: right;
  height: 100%;
  object-fit: scale-down;
}
</style>
