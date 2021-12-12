<!--  -->
<template>
  <transition ref="root" name="mx-fade">
    <div
      v-show="isActive"
      tabindex="0"
      class="mx-full-loading is-active"
      :class="{ 'is-full-page': isFullPage }"
      :aria-busy="isActive"
      aria-label="Loading"
      :style="{ zIndex }"
    >
      <div
        class="mx-full-loading__bg"
        :style="bgStyle"
        @click.prevent="cancel"
      ></div>
      <div class="mx-full-loading__icon">
        <slot name="before"></slot>
        <slot name="default">
          <component
            :is="loader"
            :color="color"
            :width="width"
            :height="height"
          />
        </slot>
        <slot name="after"></slot>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { render } from 'vue'
import { MayBeHTMLElement, removeElement } from './utils/helpers'
import trapFocusMixin from './utils/trapFocusMixin'
import Loaders from './loaders/index'
import {addClass} from '@meng-ui-vue/utils/dom'
export default {
  name : 'MxFullLoading',
  components: Loaders,
  mixins: [trapFocusMixin],
  props: {
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, MayBeHTMLElement], // 父容器
    isFullPage: { // 是否全屏显示加载动画
      type: Boolean,
      default: true,
    },
    enforceFocus: {
      type: Boolean,
      default: true,
    },
    lockScroll: { // 是否冻结 全屏滚动
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'fade',
    },
    canCancel: Boolean, // 点击空白区域 是否 可以 取消加载动画

    onCancel: { // 加载动画 取消时的回调函数
      type: Function,
      default: () => ({}),
    },

    color: String,
    backgroundColor: String, // 背景色
    blur: {
      type: String,
      default: '2px',
    },
    opacity: Number,
    width: Number, // 动画区域宽度 px
    height: Number, // 动画区域高度 px
    zIndex: Number,
    loader: {
      type: String,
      default: 'pendulum',
      validator: (val: string) => {
        return [
          'pendulum',
          'circle',
          'move',
        ].includes(val)
      },
    },
  },

  emits: ['hide', 'update:active'],
  data() {
    return {
      isActive: this.active,
    }
  },

  computed: {
    bgStyle() {
      return {
        background: this.loader == 'move'? '#403833' : this.backgroundColor,
        opacity: this.opacity,
        backdropFilter: `blur(${this.blur})`,
      }
    },
  },
  watch: {
    active(value) {
      this.isActive = value
    },
    isActive(value) {
      if (value) {
        this.disableScroll()
      } else {
        this.enableScroll()
      }
    },
  },

  mounted() {
    // 监听 ESC 按键
    document.addEventListener('keyup', this.keyPress)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.keyPress)
  },

  methods: {
    hide() {
      this.$emit('hide')
      this.$emit('update:active', false)

      if (this.programmatic) { // 如果需要频繁的显示和隐藏 加载动画 建议 将 programmatic 置位 false
        this.isActive = false
        // setTimeout(() => {
        //   const parent = this.$refs.root.parentElement
        //   // 移除 DOM 元素
        //   render(null, parent)
        //   removeElement(parent)
        // }, 150)
      }
    },
    show(){
      addClass(this.container,'mx-full-loading-parent')
      this.$nextTick(() => {
         this.$emit('update:active', true) 
         this.isActive = true
      })
      
    },
    toggle(){
      
      if(this.isActive){
        this.$emit('update:active', false)
        this.isActive = false
      }else{
        // this.$emit('update:active', true)
        // this.isActive = true
        this.show()
      }
    },
    destroy() {
      setTimeout(() => {
        const parent = this.$refs.root.parentElement
        // 移除 DOM 元素
        render(null, parent)
        removeElement(parent)
      }, 150)
    },
    cancel() {
      if (!this.canCancel || !this.isActive) return
      this.hide()
      this.onCancel.apply(null, arguments)
    },
    disableScroll() { // 禁止屏幕滚动
      if (this.isFullPage && this.lockScroll) {
        document.body.classList.add('mx-shown')
      }
    },
    enableScroll() { // 启用屏幕滚动
      if (this.isFullPage && this.lockScroll) {
        document.body.classList.remove('mx-shown')
      }
    },
    keyPress(event) {
      if (event.keyCode === 27) this.cancel()
    },
  },
}

</script>
<style lang='scss' scoped>
</style>

