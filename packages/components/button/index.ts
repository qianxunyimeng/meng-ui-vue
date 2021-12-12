// import { App } from 'vue'
// import Button from './src/button.vue'

// Button.install = (app: App): void => {
//   app.component(Button.name, Button)
// }

// export default Button

import { withInstall } from "@meng-ui-vue/utils/with-install";
import Button from "./src/button.vue";

export const MxButton = withInstall(Button);
export default MxButton;

export * from "./src/button";