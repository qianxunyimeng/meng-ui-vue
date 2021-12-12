import { ref, unref, inject, computed } from 'vue'
import { useGlobalConfig as useGlobalConfigLegacy } from "@meng-ui-vue/utils/util";
import { mxFormItemKey, mxFormKey } from "@meng-ui-vue/tokens";
import { buildProp, componentSize } from '@meng-ui-vue/utils/props'
import { useProp, useGlobalConfig } from "..";
import type { ComponentSize } from '@meng-ui-vue/utils/types'
import type { MaybeRef } from '@vueuse/core'


export const useSize = (
  fallback?: MaybeRef<ComponentSize | "" | undefined>,
  ignore: Partial<Record<"prop" | "form" | "formItem" | "global", boolean>> = {}
) => {
  const emptyRef = ref(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>("size");
  const globalConfig = ignore.global ? emptyRef : useGlobalConfig("size");
  const globalConfigLegacy = ignore.global
    ? { size: undefined }
    : useGlobalConfigLegacy();
  const form = ignore.form ? { size: undefined } : inject(mxFormKey, undefined);
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(mxFormItemKey, undefined);

  return computed(
    () =>
      size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfig.value ||
      globalConfigLegacy.size ||
      ""
  );
};

export const useSizeProp = buildProp({
  type: String,
  values: ["", "large", "medium", "small", "mini"],
  default: "",
} as const);

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>("disabled");
  //const form = inject(elFormKey, undefined);
  return computed(
    () => disabled.value || unref(fallback) || false
  );
};

