<template>
  <i :class="`mx-icon-${name}`" :style="style"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MxIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
