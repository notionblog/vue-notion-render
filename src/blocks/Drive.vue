<template>
  <a :href="data.url" target="_blank">
    <div class="v_notion_drive">
      <img :src="data.thumbnail" />
      <div class="v_notion_drive_details">
        <span class="v_notion_drive_details_title">{{ data.title }}</span>
        <span>Last Modified By: {{ data.user_name }}</span>
        <div class="v_notion_drive_details_link">
          <img
            class="inline-block object-contain"
            :src="data.icon"
            width="15"
            height="15"
            alt="drive icon"
          />
          <span> {{ data.url.split("/")[2] }}</span>
        </div>
      </div>
    </div>
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
a {
  color: inherit;
  text-decoration: none;
}
.v_notion_drive {
  width: 100%;
  margin: auto;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
}
.v_notion_drive > img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.v_notion_drive_details {
  padding: 20px;
}
.v_notion_drive_details span {
  color: inherit;
  display: inline-block;
  margin-bottom: 10px;
}
.v_notion_drive_details_title {
  font-size: 12pt;
}
.v_notion_drive_details_link img {
  margin-right: 10px;
}
</style>
