<template>
  <section>
    <div
      style="margin-bottom:30px"
      v-for="(block, i) in blocks"
      :key="block.id"
      :id="block.id"
    >
      <!-- Ordered List -->
      <ol
        style="margin:0;padding:0"
        v-if="
          block.type == 'numbered_list_item' && block.numbered_list_item.text
        "
      >
        <span v-if="blocks[--i].type != 'numbered_list_item'"
          >{{ (listCount = 1) }}.
        </span>
        <span v-else> {{ ++listCount }}. </span>

        <Txt :p="block.numbered_list_item.text" />
      </ol>
      <!-- Toggle -->
      <div v-if="block.type == 'u_toggle'">
        <Toggle v-if="block.type == 'u_toggle'" :summary="block.u_toggle.text">
          <blocks
            v-for="t_block in toggleBlocks[block.id]"
            :key="t_block.id"
            :isCustom="checkCustom(t_block)"
            :block="t_block"
          />
        </Toggle>
      </div>
      <!-- Column List -->
      <div
        style="display:flex;align-items:flex-start;flex:wrap;gap:25px"
        v-if="block.type == 'u_column_list'"
      >
        <div
          v-for="row in columnList[block.id]"
          :style="`width :${row.ratio * 100}%; `"
          :key="row.id"
        >
          <blocks
            v-for="r_block in row.blocks"
            :key="r_block.id"
            :isCustom="checkCustom(r_block)"
            :block="r_block"
          />
        </div>
      </div>
      <blocks v-else :isCustom="checkCustom(block)" :block="block" />
    </div>
  </section>
</template>
<script>
import { format } from "./utils/u_format";
import blocks from "./blocks.vue";
import Txt from "./blocks/Txt.vue";
import Toggle from "./blocks/Toggle.vue";
export default {
  name: "render",
  components: {
    blocks,
    Txt,
    Toggle,
  },
  props: {
    unofficial: Boolean,
    data: [Array, Object],
    custom: [Array],
  },
  data() {
    return {
      toggleBlocks: {},
      columnList: {},
    };
  },
  computed: {
    blocks() {
      return this.getBlocks();
    },
  },
  methods: {
    checkCustom(block) {
      for (let i = 0; i < this.custom.length; i++) {
        if (this.custom[i].blockId == block.id) {
          return this.custom[i];
        }
      }
      return null;
    },

    getBlocks() {
      if (this.unofficial === true) {
        let blocks = format(this.data);
        let ids = [];
        blocks.map((block) => {
          if (block.type == "u_toggle") {
            ids.push(...block.content);
            this.toggleBlocks[block.id] = blocks.filter((el) =>
              block.content.includes(el.id)
            );
          }
          if (block.type == "u_column_list") {
            let columnRows = [];
            //find rows
            let rows = blocks.filter((el) => block.content.includes(el.id));

            // find rows data
            rows.map((row) => {
              let rowData = {
                id: row.id,
                ratio: row.ratio,
                blocks: blocks.filter((el) => row.content.includes(el.id)),
              };
              ids.push(...row.content);
              columnRows.push(rowData);
            });

            this.columnList[block.id] = columnRows;
          }
        });
        return blocks.filter((block) => !ids.includes(block.id));
      }

      return this.data;
    },
  },
};
</script>
