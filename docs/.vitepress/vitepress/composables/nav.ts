import { computed } from 'vue'
import { useData } from 'vitepress'

import { useLang } from './lang'

export const useNav = () => {
  const { theme } = useData()
  const lang = useLang()
  //console.log(lang)
  console.log(theme)
  //console.log(theme.value.nav[lang.value]);
  return computed(() => {
    return theme.value.nav[lang.value]
  })
}
