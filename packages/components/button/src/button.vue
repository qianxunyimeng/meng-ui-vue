<template>
  <button
    ref="buttonRef"
    :class="[
      'mx-button',
      buttonType ? 'mx-button--' + buttonType : '',
      buttonSize ? 'mx-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <!-- <mx-icon v-if="loading" class="is-loading">
      <loading />
    </mx-icon>
    <el-icon v-else-if="icon">
      <component :is="icon" />
    </el-icon> -->
    <i v-if="loading" class="mx-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>

    <span
      v-if="$slots.default"
      :class="{ 'mx-button__text--expand': shouldAddSpace }"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, inject, defineComponent, Text, ref } from 'vue'
import { useCssVar } from '@vueuse/core'
//import { ElIcon } from '@element-plus/components/icon'
import {
  useDisabled,
  useFormItem,
  useGlobalConfig,
  useSize,
} from '@meng-ui-vue/hooks'
import { buttonGroupContextKey } from '@meng-ui-vue/tokens'
//import { Loading } from '@element-plus/icons-vue'

import { lighten, darken } from '@meng-ui-vue/utils/color'

import { buttonEmits, buttonProps } from './button'

export default defineComponent({
  name: 'MxButton',

  // components: {
  //   ElIcon,
  //   Loading,
  // },

  props: buttonProps,
  emits: buttonEmits,

  setup(props, { emit, slots }) {
    const buttonRef = ref()
    const buttonGroupContext = inject(buttonGroupContextKey, undefined)
    const globalConfig = useGlobalConfig('button')
    const autoInsertSpace = computed(
      () =>
        props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false
    )

    // add space between two characters in Chinese
    const shouldAddSpace = computed(() => {
      const defaultSlot = slots.default?.()
      if (autoInsertSpace.value && defaultSlot?.length === 1) {
        const slot = defaultSlot[0]
        if (slot?.type === Text) {
          const text = slot.children
          return /^\p{Unified_Ideograph}{2}$/u.test(text as string)
        }
      }
      return false
    })

    const { form } = useFormItem()
    const buttonSize = useSize(computed(() => buttonGroupContext?.size))
    const buttonDisabled = useDisabled()
    const buttonType = computed(
      () => props.type || buttonGroupContext?.type || 'default'
    )

    // calculate hover & active color by color
    const typeColor = computed(
      () => useCssVar(`--mx-color-${props.type}`).value
    )
    const buttonStyle = computed(() => {
      let styles = {}

      const buttonColor = props.color || typeColor.value

      if (buttonColor) {
        const darkenBgColor = darken(buttonColor, 0.1)
        if (props.plain) {
          styles = {
            '--mx-button-bg-color': lighten(buttonColor, 0.9),
            '--mx-button-text-color': buttonColor,
            '--mx-button-hover-text-color': 'var(--mx-color-white)',
            '--mx-button-hover-bg-color': buttonColor,
            '--mx-button-hover-border-color': buttonColor,
            '--mx-button-active-bg-color': darkenBgColor,
            '--mx-button-active-text-color': 'var(--mx-color-white)',
            '--mx-button-active-border-color': darkenBgColor,
          }
        } else {
          const lightenBgColor = lighten(buttonColor)
          styles = {
            '--mx-button-bg-color': buttonColor,
            '--mx-button-border-color': buttonColor,
            '--mx-button-hover-bg-color': lightenBgColor,
            '--mx-button-hover-border-color': lightenBgColor,
            '--mx-button-active-bg-color': darkenBgColor,
            '--mx-button-active-border-color': darkenBgColor,
          }
        }

        if (buttonDisabled.value) {
          const disabledButtonColor = lighten(buttonColor, 0.5)
          styles['--mx-button-disabled-bg-color'] = disabledButtonColor
          styles['--mx-button-disabled-border-color'] = disabledButtonColor
        }
      }

      return styles
    })

    const handleClick = (evt: MouseEvent) => {
      if (props.nativeType === 'reset') {
        form?.resetFields()
      }
      emit('click', evt)
    }

    return {
      buttonRef,
      buttonStyle,

      buttonSize,
      buttonType,
      buttonDisabled,

      shouldAddSpace,

      handleClick,
    }
  },
})
</script>
