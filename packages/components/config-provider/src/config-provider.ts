import { useLocaleProps } from '@meng-ui-vue/hooks'
import { buildProps, definePropType } from '@meng-ui-vue/utils/props'
import type { ButtonConfigContext } from '@meng-ui-vue/components/button'

export const configProviderProps = buildProps({
  ...useLocaleProps,

  size: {
    type: String,
    values: ['large', 'medium', 'small', 'mini'],
  },

  button: {
    type: definePropType<ButtonConfigContext>(Object),
  },
} as const)
