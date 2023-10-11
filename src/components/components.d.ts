import XcxSwiper from './XcxSwiper.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    //
    XcxSwiper: typeof XcxSwiper
  }
}
