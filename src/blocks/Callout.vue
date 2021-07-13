<template>
  <div class="v_notion_callout">
    <slot name="icon"></slot>
    <div style="margin: 0 2px"></div>
    <slot name="text"></slot>
  </div>
</template>

<style scoped>
.v_notion_callout {
  padding: 13px;
  border: 1px solid #d6d6d6;
  background-color: #ebeced4d;
  display: flex;
  align-items: center;
  border-radius: 5px;
}
</style>
