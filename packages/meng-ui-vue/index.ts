import installer from './defaults'
export * from '@meng-ui-vue/components'
export * from '@meng-ui-vue/directives'
export * from '@meng-ui-vue/hooks'
export * from '@meng-ui-vue/tokens'

export { default as makeInstaller } from './make-installer'
export { default } from './defaults'

export const install = installer.install
export const version = installer.version
