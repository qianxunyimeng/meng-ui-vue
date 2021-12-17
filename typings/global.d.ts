// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    MxBadge: typeof import("meng-ui-vue")["MxBadge"];
    MxButton: typeof import("meng-ui-vue")["MxButton"];
    MxConfigProvider: typeof import("meng-ui-vue")["MxConfigProvider"];
    MxCountTo: typeof import("meng-ui-vue")["MxCountTo"];
    MxIcon: typeof import("meng-ui-vue")["MxIcon"];
    MxZoom: typeof import("meng-ui-vue")["MxZoom"];
  }
}

export {}
