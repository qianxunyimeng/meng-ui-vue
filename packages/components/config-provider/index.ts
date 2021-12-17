import { withInstall } from '@meng-ui-vue/utils/with-install'
import { ConfigProvider } from './src'

export const MxConfigProvider = withInstall(ConfigProvider)
export default MxConfigProvider

export * from './src/config-provider'
