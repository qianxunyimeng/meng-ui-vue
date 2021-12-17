import ElementPlus from 'element-plus'
//import { ElIcon, ElTooltip ,ElButton, ElDivider, ElCollapseTransition, ElRow, ElCol, ElBadge} from 'element-plus'
import MengUI from "meng-ui-vue"
import icon from "../../icon.json"

import VPApp, { globals, NotFound } from '../vitepress'

export default {
  NotFound,
  Layout: VPApp,
  logo: '/images/meng-ui-logo-small.svg',
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    app.use(MengUI)
    //app.use(ElIcon).use(ElButton).use(ElTooltip).use(ElDivider).use(ElCollapseTransition).use(ElRow).use(ElCol).use(ElBadge)
    app.config.globalProperties.$icon = icon

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
