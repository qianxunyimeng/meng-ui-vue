import { provide, defineComponent } from 'vue'
import { provideLocale } from '@meng-ui-vue/hooks'
import { configProviderContextKey } from '@meng-ui-vue/tokens'
import { configProviderProps } from './config-provider'

export const ConfigProvider = defineComponent({
  name: 'ElConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    provideLocale()
    provide(configProviderContextKey, props)
    return () => slots.default?.()
  },
})
