<!--  -->
<template>
  <span class="mx-count-to-number">
    {{ displayValue }}
  </span>
</template>

<script lang='ts'>
import { defineComponent,reactive,toRefs,onUnmounted,computed,watch } from 'vue'
import { requestAnimationFrame, cancelAnimationFrame } from './animate'
export default defineComponent({
  name: 'MxCountTo',
  props: {
    startVal: {
      type: Number,
      required: false,
      default: 0,
    },
    endVal: {
      type: Number,
      required: false,
      default: 2017,
    },
    duration: {
      type: Number,
      required: false,
      default: 3000,
    },
    delay: {
      type: Number,
      required: false,
      default: 0,
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true,
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator: (val: number): boolean => {
        return val >= 0
      },
    },
    // 十进制分隔
    decimal: {
      type: String,
      required: false,
      default: '.',
    },
    // 分隔符
    separator: {
      type: String,
      required: false,
      default: '',
    },
    prefix: {
      type: String,
      required: false,
      default: '',
    },
    suffix: {
      type: String,
      required: false,
      default: '',
    },
    //缓和功能
    useEasing: {
      type: Boolean,
      required: false,
      default: true,
    },
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
      },
    },
  },
  emits:['callback','mountedCallback'],
  setup(props,{ emit }) {

    const isNumber = val => {
      return !isNaN(parseFloat(val))
    }
    const formatNumber = num => {
      num = num.toFixed(props.decimals)
      num += ''
      const x = num.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? props.decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + props.separator + '$2')
        }
      }
      return props.prefix + x1 + x2 + props.suffix
    }

    const data = reactive({
      localStartVal: props.startVal,
      displayValue: formatNumber(props.startVal),
      printVal: null,
      paused: false,
      localDuration: props.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null,
    })

    /** methods */
    const start = () => {
      data.localStartVal = props.startVal
      data.startTime = null
      data.localDuration = props.duration
      data.paused = false
      data.rAF = requestAnimationFrame(count)
    }
    // 暂停
    const pauseResume = () => {
      if (data.paused) {
        resume()
        data.paused = false
      } else {
        pause()
        data.paused = true
      }
    }
    // 暂停计数
    const pause = () => {
      cancelAnimationFrame(data.rAF)
    }
    //重置countTo
    const resume = () => {
      data.startTime = null
      data.localDuration = +data.remaining
      data.localStartVal = +data.printVal
      requestAnimationFrame(count)
    }

    const reset = () => {
      data.startTime = null
      cancelAnimationFrame(data.rAF)
      data.displayValue = formatNumber(props.startVal)
    }

    const count = timestamp => {
      if (!data.startTime) data.startTime = timestamp
      data.timestamp = timestamp
      const progress = timestamp - data.startTime
      data.remaining = data.localDuration - progress

      if (props.useEasing) {
        if (countDown.value) {
          data.printVal = data.localStartVal - props.easingFn(progress, 0, data.localStartVal - props.endVal, data.localDuration)
        } else {
          data.printVal = props.easingFn(progress, data.localStartVal, props.endVal - data.localStartVal, data.localDuration)
        }
      } else {
        if (countDown.value) {
          data.printVal = data.localStartVal - ((data.localStartVal - props.endVal) * (progress / data.localDuration))
        } else {
          data.printVal = data.localStartVal + (props.endVal - data.localStartVal) * (progress / data.localDuration)
        }
      }
      if (countDown.value) {
        data.printVal = data.printVal < props.endVal ? props.endVal : data.printVal
      } else {
        data.printVal = data.printVal > props.endVal ? props.endVal : data.printVal
      }

      data.displayValue = formatNumber(data.printVal)
      if (progress < data.localDuration) {
        data.rAF = requestAnimationFrame(count)
      } else {
        // 计数 结束
        emit('callback')
      }
    }



    const countDown = computed(() => {
      return props.startVal > props.endVal
    })

    watch(() => props.startVal, () => {
      if (props.autoplay) {
        setTimeout(() => {
          start()
        }, props.delay)
      }
    })

    watch(() => props.endVal, () => {
      if (props.autoplay) {
        setTimeout(() => {
          start()
        }, props.delay)
      }
    })

    if (props.autoplay) {
      setTimeout(() => {
        start()
      }, props.delay)
    }
    emit('mountedCallback')




    //组件卸载
    onUnmounted(() => {
      cancelAnimationFrame(data.rAF)
    })
    const refData = toRefs(data)
    return {
      ...refData,
      start,
      pauseResume,
      pause,
      resume,
      reset,
    }

  },
})
</script>
<style lang='scss' scoped>
</style>

