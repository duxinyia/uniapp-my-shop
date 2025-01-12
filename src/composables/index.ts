import type { XcxGuessInstance } from '@/types/component'
import { ref } from 'vue'
// 猜你喜欢组合式函数
export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<XcxGuessInstance>()
  // 滚动触底
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  // 返回ref和事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}
