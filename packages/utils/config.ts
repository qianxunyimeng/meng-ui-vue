import type { ComponentSize } from './types'

export interface InstallOptions {
  size: ComponentSize
  zIndex: number
  locale?: any
}

let $MENGUIVUE = {} as InstallOptions

const setConfig = (option: InstallOptions): void => {
  $MENGUIVUE = option
}

const getConfig = (key: keyof InstallOptions): unknown => {
  return $MENGUIVUE[key]
}

export { getConfig, setConfig }
