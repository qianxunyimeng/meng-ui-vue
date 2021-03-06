import type { configProviderProps } from '@meng-ui-vue/components/config-provider'
import type { InjectionKey, ExtractPropTypes } from 'vue'

export type ConfigProviderContext = ExtractPropTypes<typeof configProviderProps>

export const configProviderContextKey: InjectionKey<ConfigProviderContext> =
  Symbol()
