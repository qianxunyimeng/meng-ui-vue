<template>
  <div class="block" style="height:400px;width:840px;border: 1px solid #dcdee2;">
    <mx-split v-model:value.sync="split1" :split="true" max='100px' min='200px'>
      <template #left>
        <mx-split v-model:value.sync="split2" mode="vertical" :split="true" :min='0.3' :max='0.3'>
          <template #top>
            左上面板
          </template>
          <template #bottom>
            左下面板
          </template>
        </mx-split>
      </template>
      <template #right>
        右面板
      </template>
    </mx-split>
     
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive,ref} from 'vue'
import { MxSplit } from 'meng-ui-vue'

export default defineComponent({
  setup() {
    const split1 = ref(0.5)
    const split2 = ref(0.5)


    return {
      split1,
      split2
    }
  },
})
</script>
<style scoped>
</style>