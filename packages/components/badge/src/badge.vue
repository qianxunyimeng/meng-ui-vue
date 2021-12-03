<template>
  <div class="mx-badge">
    <slot></slot>
    <transition name="mx-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === '0' || isDot)"
        class="mx-badge__content"
        :class="[
          'mx-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot,
          },
        ]"
        v-text="content"
      >
      </sup>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { badgeProps } from './badge'

export default defineComponent({
  name: 'MxBadge',

  props: badgeProps,

  setup(props) {
    const content = computed<string>(() => {
      if (props.isDot) return ''

      if (typeof props.value === 'number' && typeof props.max === 'number') {
        return props.max < props.value ? `${props.max}+` : `${props.value}`
      }
      return `${props.value}`
    })

    return {
      content,
    }
  },
})
</script>
