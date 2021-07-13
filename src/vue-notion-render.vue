<template>
  <section>
    <div v-for="block in blocks" :key="block.id" :id="block.id">
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
            :block="r_block"
          />
        </div>
      </div>
      <blocks v-else :block="block" />
    </div>
  </section>
</template>
<script>
import { format } from "./utils/u_format";
import blocks from "./blocks.vue";
export default {
  name: "render",
  components: {
    blocks,
  },
  props: {
    unofficial: Boolean,
    data: [Array, Object],
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
            console.log("checki ", columnRows);
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
