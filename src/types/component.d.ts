/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import XcxSwiper from '@/components/XcxSwiper.vue'
import XcxGuess from '@/components/XcxGuess.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XcxSwiper: typeof XcxSwiper
    XcxGuess: typeof XcxGuess
  }
}

/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 列表数据 */
  items: T[]
  /** 总条数 */
  counts: number
  /** 当前页数 */
  page: number
  /** 总页数 */
  pages: number
  /** 每页条数 */
  pageSize: number
}

// 组件实例类型
export type XcxGuessInstance = InstanceType<typeof XcxGuess>
