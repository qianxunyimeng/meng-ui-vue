<template>
  <div class="mx-zoom-mask" :style="maskStyle">
    <div class="block top" :style="topStyle"></div>
    <div class="block left" :style="leftStyle"></div>
    <div class="block right" :style="rightStyle"></div>
    <div class="block bottom" :style="bottomStyle"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,onBeforeMount,onMounted,computed } from 'vue'
export default defineComponent({
  name: 'MxZoomMask',
  props: {
    pWidth: {
      type: Number,
      default: 0,
    },
    pHeight: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    maskColor: {
      type: String,
      default: 'rgba(255,255,255,0.6)',
    },
  },
  setup(props) {

    const topStyle = computed(() => {
      return {
        width: props.pWidth + 'px',
        height: props.top + 'px',
      }
    })

    const leftStyle = computed(() => {
      return {
        width: props.left + 'px',
        height: props.height + 'px',
      }
    })

    const rightStyle = computed(() => {
      return {
        width: props.pWidth - props.left - props.width + 'px',
        height: props.height + 'px',
      }
    })

    const bottomStyle = computed(() => {
      return {
        width: props.pWidth + 'px',
        height: props.pHeight - props.top - props.height + 'px',
      }
    })

    const maskStyle = computed(() => {
      return {
        color: props.maskColor,
      }
    })

    return {
      topStyle,
      leftStyle,
      rightStyle,
      bottomStyle,
      maskStyle,
    }

  },
})
</script>
