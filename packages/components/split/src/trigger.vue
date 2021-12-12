<!--  -->
<template>
  <div :class="classes">
    <div :class="barConClasses">
      <i
        v-for="i in 8"
        v-once
        :key="`trigger-${i}`"
        :class="`${prefix}-bar`"
      ></i>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,reactive,toRefs,computed } from 'vue'
export default defineComponent({
  name: 'Trigger',
  props: {
    mode: String,
  },
  setup(props) {
    const data = reactive({
      prefix: 'mx-split-trigger',
      initOffset: 0,
    })

    const isVertical = computed(() => {
      return props.mode === 'vertical'
    })

    const classes = computed(() => {
      return [
        data.prefix,
        isVertical.value ? `${data.prefix}-vertical` : `${data.prefix}-horizontal`,
      ]
    })

    const barConClasses = computed(() => {
      return [
        `${data.prefix}-bar-con`,
        isVertical.value ? 'vertical' : 'horizontal',
      ]
    })

    const refData = toRefs(data)
    return {
      ...refData,
      classes,
      barConClasses,
    }

  },
})
</script>
<style lang='scss' scoped>
</style>
