
<template>
  <div>
     <div style="height:200px;border:1px solid" ref="formContainer">全局加载动画</div>
    <mx-button @click.prevent="simulate">加载动画</mx-button>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onBeforeMount,onMounted } from 'vue'
import {MxButton,MxFullLoading} from '@meng-ui-vue/components'

let timer = null
export default {
   components:{MxButton},
  data() {
    return {
      fullPage: true,
      canCancel: false,
      useSlot: true,
      //loader: 'move', // pendulum,circle,move
      timeout: 3000, //ms
      color: '#00ab00',
      //bgColor: '#4b4b4b',
      height: 64,
      width: 64,
      loaderIns: null,
    }
  },
  mounted() {
    this.loaderIns = MxFullLoading().config({
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: this.canCancel,
      onCancel: this.whenCancelled,
      color: this.color,
      backgroundColor: this.bgColor,
      height: this.height,
      width: this.width,
      loader: this.loader,
      //opacity: 0.3,
    }, {})
    console.log(this.loaderIns)
  },
  methods: {
    simulate() {
      this.loaderIns.toggle()
      // simulate async call
      timer = setTimeout(() => {
        this.loaderIns && this.loaderIns.toggle()
      }, this.timeout)
    },
    whenCancelled() {
      clearTimeout(timer)
      console.log('User cancelled the loader.')
    },
  },
}
</script>
<style scoped>
.customslot{
  color: black;
}
</style>