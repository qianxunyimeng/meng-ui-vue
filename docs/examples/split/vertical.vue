<template>
  <div class="block" style="height:400px;width:840px;border: 1px solid #dcdee2;">
    <mx-split v-model:value.sync="split" mode="vertical">
      <template #top>
        上边面板
      </template>
      <template #bottom>
        下边面板
      </template>
    </mx-split>
     
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive,ref} from 'vue'
import { MxSplit } from 'meng-ui-vue'

export default defineComponent({
  setup() {
    const split = ref(0.5)
    

    return {
      split
    }
  },
})
</script>
<style scoped>
</style>