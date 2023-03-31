import { customRef } from 'vue'
export function useDebounceRef (value:any, delay = 200) {
  return customRef((track, trigger) => {
    return {
      get () {
        track() // 依赖收集
        return value
      },
      set (val) {
        value = val
        trigger() // 派发
      }
    }
  })
}
