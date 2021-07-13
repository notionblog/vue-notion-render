<template>
  <span>
    <span
      v-for="(item, i) in p"
      :key="i"
      :class="{
        fontBold: item.annotations.bold && !item.annotations.code,
        italic: item.annotations.italic,
        lineThrough: item.annotations.strikethrough,
        underline: item.annotations.underline,
        code: item.annotations.code,
        serif: item.type == 'equation',
      }"
      :style="{
        color:
          item.annotations.color != 'default'
            ? getColor(item.annotations.color)
            : null,
        'background-color':
          item.annotations.color != 'default' &&
          item.annotations.color.split('_')[1]
            ? getBgColor(item.annotations.color.split('_')[0])
            : 'none',
      }"
    >
      <a
        v-if="item.href"
        :href="item.href"
        target="_blank"
        class="text-blue-600 underline"
        >{{ item.plain_text }}</a
      >
      <span v-else-if="!item.href">{{ item.plain_text }}</span>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    p: Array,
  },
  methods: {
    getColor(color) {
      const colors = {
        red: "#e03e3e",
        gray: "#9b9a97",
        brown: "#64473a",
        orange: "#d9730d",
        yellow: "#dfab01",
        teal: "#0f7b6c",
        blue: "#0b6e99",
        purple: "#6940a5",
        pink: "#ad1a72",
      };
      return colors[color];
    },
    getBgColor(color) {
      const colors = {
        red: "#fbe4e4",
        gray: "#ebeced",
        brown: "#e9e5e3",
        orange: "#faebdd",
        yellow: "#fbf3db",
        teal: "#ddedea",
        blue: "#ddebf1",
        purple: "#eae4f2",
        pink: "#f4dfeb",
      };
      return colors[color];
    },
  },
};
</script>

<style scoped>
.fontBold {
  font-weight: bold;
}
.lineThrough {
  text-decoration: line-through;
}
.serif {
  font-family: serif;
}
.code {
  color: red;
  background-color: "#333";
}
</style>
