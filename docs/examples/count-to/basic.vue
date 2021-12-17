<template>
  <div class="block" style="min-width:900px;">
      <mx-count-to
        ref="example1"
        class="example1"
        :start-val="startVal1"
        :end-val="endVal1"
        :duration="2500"
        :delay="300"
      />
     
    <mx-button  @click="start">start</mx-button>
    <mx-button  @click="changeEndVal">end-val +1000</mx-button>
    <mx-button  @click="incrementalUpdate">end-val 追加 1000</mx-button>
     
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive,ref} from 'vue'
import { MxCountTo,MxButton } from 'meng-ui-vue'

export default defineComponent({
  setup() {
    const example1 = ref()
    const data = reactive({
      setStartVal: 0,
      setEndVal: 2017,
      setDuration: 4000,
      setDecimals: 0,
      setSeparator: ',',
      startVal1:0,
      endVal1:2021,
    })

    const changeEndVal = () =>{
      data.endVal1=data.endVal1+1000
    }

    const incrementalUpdate = () => {
      data.startVal1=data.endVal1
      data.endVal1=data.endVal1+1000
    }

    const start = () => {
      example1.value.start()
    }

    const refData = toRefs(data)
    

    return {
      ...refData,
     example1,
      changeEndVal,
      incrementalUpdate,
      start,
    }
  },
})
</script>
<style scoped>
.example1 {
  font-size: 40px;
  color: #30B08F;
  display: block;
  margin: 10px 0;
}
</style>