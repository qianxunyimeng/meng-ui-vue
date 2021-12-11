import ElementPlus from 'element-plus'
import MengUI from "meng-ui-vue"

import VPApp, { globals, NotFound } from '../vitepress'

export default {
  NotFound,
  Layout: VPApp,
  logo: '/images/meng-ui-logo-small.svg',
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    app.use(MengUI)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
