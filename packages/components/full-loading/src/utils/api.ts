import { createComponent } from './helpers'
import LoadingVue from '../index.vue'

export function useLoading(globalProps = {}, globalSlots = {}) {
  return {
    config(props = globalProps, slots = globalSlots) {
      const forceProps = {
        programmatic: true,
        lockScroll: true,
        isFullPage: false,
        active: false,
      }

      const propsData = Object.assign({}, globalProps, props, forceProps)
      let container = propsData.container!

      if (!propsData.container!) {
        container = document.body
        propsData.isFullPage = true
      }

      const mergedSlots = Object.assign({}, globalSlots, slots)
      const instance = createComponent(
        LoadingVue,
        propsData,
        container,
        mergedSlots,
      )

      return {
        hide: instance.ctx!.hide,
        show: instance.ctx!.show,
        toggle: instance.ctx!.toggle,
        destroy: instance.ctx!.destroy,
      }
    },
  }
}

export default useLoading as FullLoading;
