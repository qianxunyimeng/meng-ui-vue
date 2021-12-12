<!-- vue 3.x 版本 -->
<template>
  <div ref="outerWrapper" :class="wrapperClasses">
    <div v-if="isHorizontal" :class="`${prefix}-horizontal`">
      <div :style="{right: `${anotherOffset}%`}" class="left-pane" :class="paneClasses">
        <slot name="left"></slot>
      </div>
      <div :class="`${prefix}-trigger-con`" :style="{left: `${offset}%`}" @mousedown="handleMousedown">
        <slot name="trigger">
          <trigger mode="vertical" />
        </slot>
      </div>
      <div :style="{left: `${offset}%`}" class="right-pane" :class="paneClasses">
        <slot name="right"></slot>
      </div>
    </div>
    <div v-else :class="`${prefix}-vertical`">
      <div :style="{bottom: `${anotherOffset}%`}" class="top-pane" :class="paneClasses">
        <slot name="top"></slot>
      </div>
      <div :class="`${prefix}-trigger-con`" :style="{top: `${offset}%`}" @mousedown="handleMousedown">
        <slot name="trigger">
          <trigger mode="horizontal" />
        </slot>
      </div>
      <div :style="{top: `${offset}%`}" class="bottom-pane" :class="paneClasses">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,reactive,toRefs,onUnmounted,computed,watch,ref,nextTick } from 'vue'
import Trigger from './trigger.vue'
import { on,off } from '@meng-ui-vue/utils/dom'
export default defineComponent({
  name: 'MxSplit',
  components: {
    Trigger,
  },
  props: {
    value: { // left 或 top 在整个split中的占比
      type: [Number, String],
      default: 0.5,
    },
    mode: {
      type: String,
      default: 'horizontal',
      validator: (val: string) => {
        return [
          'horizontal',
          'vertical',
        ].includes(val)
      },
    },
    split:{ //是否 可以 滑动分隔栏
      type: Boolean,
      default: true,
    },
    min: { // left 最小宽度
      type: [Number, String],
      default: '40px',
    },
    max: { // right 最小宽度
      type: [Number, String],
      default: '40px',
    },
  },
  setup(props,{ emit }) {
    const outerWrapper = ref<HTMLElement>(null)
    const data = reactive({
      prefix: 'mx-split',
      offset: 0,
      oldOffset: 0,
      initOffset: 0,
      isMoving: false,
      computedMin: 0,
      computedMax: 0,
      currentValue: 0.5,
    })


    /** methods */


    const wrapperClasses = computed(() => {
      return [
        `${data.prefix}-wrapper`,
        data.isMoving ? 'no-select' : '',
      ]
    })

    const paneClasses = computed(() => {
      return [
        `${data.prefix}-pane`,
        {
          [`${data.prefix}-pane-moving`]: data.isMoving,
        },
      ]
    })

    const isHorizontal = computed(() => {
      return props.mode === 'horizontal'

    })

    const anotherOffset = computed(() => {
      return 100 - data.offset
    })

    const valueIsPx = computed(() => {
      return typeof props.value === 'string'
    })

    /**
     * box-sizing:content-box
     * offsetWidth = 水平方向 width + 左右padding + 左右border
     * offsetHeight = 垂直方向 height + 上下padding + 上下border
     *
     * box-sizing:border-box
     * offsetWidth = 水平方向 width
     * offsetHeight = 垂直方向 height
     */
    const offsetSize = computed(() => {
      return isHorizontal.value ? 'offsetWidth' : 'offsetHeight'
    })
    const px2percent = (numerator, denominator) => {
      return parseFloat(numerator) / parseFloat(denominator)
    }

    // 计算 min 和 max 所占比例  min = 40px offsetWidth = 1900  比例 = 40/1900 = 0.02
    const getComputedThresholdValue = paramType => {
      // offsetWidth = 1902 left + right的总宽度
      let size = outerWrapper.value[offsetSize.value]
      if (valueIsPx.value) {
        //return typeof props[paramType] === 'string' ? props[paramType] : size * props[paramType]
        return typeof props[paramType] === 'string' ? px2percent(props[paramType], size) : props[paramType]
      } else {
        return typeof props[paramType] === 'string' ? px2percent(props[paramType], size) : props[paramType]
      }
    }

    /**const computedMin = computed(() => {
      return getComputedThresholdValue('min')
    })

    const computedMax = computed(() => {
      return getComputedThresholdValue('max')
    })*/

    //const getMin = (value1, value2) => {
    /**if (valueIsPx.value) {
        return `${Math.min(parseFloat(value1), parseFloat(value2))}px`
      } else {
        return Math.min(value1, value2)
      }*/
    //   return Math.min(value1, value2)
    // }

    const getMax = (value1, value2) => {
      /**if (valueIsPx.value) {
        return `${Math.max(parseFloat(value1), parseFloat(value2))}px`
      }else {
        return Math.max(value1, value2)
      }*/
      //console.log(value1 + '----' + value2)
      return Math.max(value1, value2)
    }

    const getAnotherOffset = value => {
      /**if (valueIsPx.value) {
        return  `${outerWrapper.value[offsetSize.value] - parseFloat(value)}px`
      }else {
        return 1 - value
      }*/
      return 1 - value
    }

    const handleMove = e => {
      if(props.split){
        let pageOffset = isHorizontal.value ? e.pageX : e.pageY
        let offset = pageOffset - data.initOffset
        let outerWidth = outerWrapper.value[offsetSize.value]
        let value = valueIsPx.value ? `${parseFloat(data.oldOffset) + offset}px` : (px2percent(outerWidth * data.oldOffset + offset, outerWidth))
        let anotherValue = getAnotherOffset(value)
        if (parseFloat(value) <= parseFloat(data.computedMin)) value = getMax(value, data.computedMin)
        if (parseFloat(anotherValue) <= parseFloat(data.computedMax)) value = getAnotherOffset(getMax(anotherValue, data.computedMax))
        e.atMin = value === data.computedMin
        e.atMax = valueIsPx.value ? getAnotherOffset(value) === data.computedMax : getAnotherOffset(value).toFixed(5) === data.computedMax.toFixed(5)
        // eslint-disable-next-line vue/no-mutating-props
        props.value = value
        emit('update:value', value)
        emit('on-moving', e)
      }

    }

    const handleUp = () => {
      data.isMoving = false
      off(document, 'mousemove', handleMove)
      off(document, 'mouseup', handleUp)
      emit('on-move-end')
    }
    const handleMousedown = e => {
      data.initOffset = isHorizontal.value ? e.pageX : e.pageY
      data.oldOffset = props.value
      data.isMoving = true
      on(document, 'mousemove', handleMove)
      on(document, 'mouseup', handleUp)
      emit('on-move-start')
    }
    const computeOffset = () => {
      //data.offset = (valueIsPx.value ? px2percent(props.value, outerWrapper.value[offsetSize.value]) : props.value) * 10000 / 100
      nextTick(() => {
        data.computedMin = getComputedThresholdValue('min')
        data.computedMax = getComputedThresholdValue('max')
        // 局部value是 小数0.x
        let value = valueIsPx.value ? px2percent(props.value, outerWrapper.value[offsetSize.value]) : props.value
        //let value =  props.value
        let anotherValue = getAnotherOffset(value)
        if (parseFloat(value) <= parseFloat(data.computedMin)) value = getMax(value, data.computedMin)
        if (parseFloat(anotherValue) <= parseFloat(data.computedMax)) value = getAnotherOffset(getMax(anotherValue, data.computedMax))
        data.offset = value * 10000 / 100
        data.currentValue = value
        emit('update:value', value)
      })
    }

    watch(() => props.value, () => {
      if (props.value !== data.currentValue) {
        data.currentValue = props.value
        computeOffset()
      }
    })

    nextTick(() => {
      computeOffset()
    })

    on(window, 'resize', computeOffset)

    onUnmounted(() => {
      off(window, 'resize', computeOffset)
    })
    const refData = toRefs(data)
    return {
      ...refData,
      outerWrapper,
      isHorizontal,
      wrapperClasses,
      anotherOffset,
      paneClasses,
      handleMousedown,
    }

  },
})
</script>

