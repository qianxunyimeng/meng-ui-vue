import { inject, toRef } from 'vue'
import { configProviderContextKey } from '@meng-ui-vue/tokens'
import type { Ref } from 'vue'
import type { ConfigProviderContext } from '@meng-ui-vue/tokens'

export function useGlobalConfig<K extends keyof ConfigProviderContext>(
  key: K
): Ref<ConfigProviderContext[K]>
export function useGlobalConfig(): ConfigProviderContext
export function useGlobalConfig(key?: keyof ConfigProviderContext) {
  const config = inject(configProviderContextKey, {})
  if (key) {
    return toRef(config, key)
  } else {
    return config
  }
}
