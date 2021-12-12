// import { App } from 'vue'
// import Split from './src/index.vue'

// Split.install = (app: App): void => {
//   app.component(Split.name, Split)
// }

// export default Split


import { withInstall } from "@meng-ui-vue/utils/with-install";
import Split from "./src/index.vue";

export const MxSplit = withInstall(Split);
export default MxSplit;

export * from "./src/split";