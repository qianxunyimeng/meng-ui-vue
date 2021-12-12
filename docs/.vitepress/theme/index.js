import ElementPlus from 'element-plus'
import MengUI from "meng-ui-vue"
import { MxButton} from 'meng-ui-vue'
import icon from "../../icon.json"

import VPApp, { globals, NotFound } from '../vitepress'

export default {
  NotFound,
  Layout: VPApp,
  logo: '/images/meng-ui-logo-small.svg',
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    app.use(MengUI)
    app.use(MxButton)
    app.config.globalProperties.$icon = icon

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
