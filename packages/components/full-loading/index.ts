// https://github.com/ankurk91/vue-loading-overlay
// import { useLoading } from "./src/utils/api";
// import Component from "./src/index.vue";

// const Plugin = (app, props = {}, slots = {}) => {
//   const instance = useLoading(props, slots);
//   app.config.globalProperties.$mxFullLoading = instance;
//   app.provide("$mxFullLoading", instance);
// };

// Component.install = Plugin;

// export default Component;
// export { useLoading };
  
  import { withInstallFunction } from "@meng-ui-vue/utils/with-install";

  import FullLoading from "./src/utils/api";

  export const MxFullLoading = withInstallFunction(FullLoading, "$mxFullLoading");
  export default MxFullLoading;

  //export * from "./src/message";
