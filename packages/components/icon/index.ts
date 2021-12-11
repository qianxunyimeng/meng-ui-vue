import { App } from 'vue'
import Icon from './src/index.vue'
import { withInstall } from "@meng-ui-vue/utils/with-install";

// Icon.install = (app: App): void => {
//   app.component(Icon.name, Icon)
// }

export const MxIcon= withInstall(Icon);
export default MxIcon;

//export * from "./src/icon";

