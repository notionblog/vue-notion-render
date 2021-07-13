<template>
  <div>
    <!-- 
        **************
        Type: Official (supported by the official notion api)
        **************    
    -->

    <!-- Pragraph -->
    <p v-if="block.type == 'paragraph' && block.paragraph.text">
      <Txt :p="block.paragraph.text" />
    </p>
    <!-- Headings -->
    <h1 v-if="block.type == 'heading_1' && block.heading_1.text">
      <Txt :p="block.heading_1.text" />
    </h1>
    <h2 v-if="block.type == 'heading_2' && block.heading_2.text">
      <Txt :p="block.heading_2.text" />
    </h2>
    <h3 v-if="block.type == 'heading_3' && block.heading_3.text">
      <Txt :p="block.heading_3.text" />
    </h3>
    <!-- Unordered list -->
    <li
      v-if="block.type == 'bulleted_list_item' && block.bulleted_list_item.text"
    >
      <Txt :p="block.bulleted_list_item.text" />
    </li>
    <!-- Todo list -->
    <div v-if="block.type == 'to_do' && block.to_do.text">
      <input
        type="checkbox"
        :id="block.id"
        :value="block.to_do.plain_text"
        :checked="block.to_do.checked"
        disabled="disabled"
      />
      <label><Txt :p="block.to_do.text"/></label>
    </div>
    <!-- 
        **************
        Type: Unofficial (Not supported yet by the official notion api)
        **************    
    -->
    <!-- image -->
    <img
      v-if="block.type == 'u_image'"
      :src="block.src"
      :width="block.width"
      :height="block.height"
      style="object-fit:fill;max-width:100%; margin:auto; display:block;"
    />

    <!-- video Or embed -->
    <iframe
      style="max-width: 100%;border:none"
      class="overflow-hidden mx-auto"
      v-if="block.type == 'u_video' || block.type == 'u_embed'"
      :width="block.width"
      :height="block.height"
      :src="block.src"
    >
    </iframe>

    <!-- Quote -->
    <Quote v-if="block.type == 'u_quote'" :data="block.u_quote.text" />

    <!-- Callout -->
    <Callout v-if="block.type == 'u_callout'">
      <template v-slot:icon>
        <img
          v-if="block.isImg === true"
          :src="block.icon"
          width="40"
          height="40"
          alt="icon"
        />
        <span v-else>{{ block.icon }}</span></template
      >
      <template v-slot:text><Txt :p="block.u_callout.text"/></template>
    </Callout>

    <!-- Divider -->
    <hr v-if="block.type == 'u_divider'" />

    <!-- Bookmark -->
    <Bookmark v-if="block.type == 'u_bookmark'" :data="block.data" />

    <!-- Code -->
    <Code
      v-if="block.type == 'u_code'"
      :language="block.language"
      :code="block.code"
    />
    <!-- Tweet -->
    <Tweet v-if="block.type == 'u_tweet'" :src="block.src" />
    <!-- File -->
    <File v-if="block.type == 'u_file'" :data="block.data" />
  </div>
</template>

<script>
import Txt from "./blocks/Txt.vue";
import Quote from "./blocks/Quote.vue";
import Callout from "./blocks/Callout.vue";
import Bookmark from "./blocks/Bookmark.vue";
import Code from "./blocks/Code.vue";
import Tweet from "./blocks/Tweet.vue";
import File from "./blocks/File.vue";
export default {
  components: {
    Txt,
    Quote,
    Callout,
    Bookmark,
    Code,
    Tweet,
    File,
  },
  props: {
    block: Object,
  },
};
</script>
