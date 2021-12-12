import { inject } from 'vue'
import { mxFormKey, mxFormItemKey } from '@meng-ui-vue/tokens'

export const useFormItem = () => {
  const form = inject(mxFormKey, undefined);
  const formItem = inject(mxFormItemKey, undefined);
  return {
    form,
    formItem,
  }
}
