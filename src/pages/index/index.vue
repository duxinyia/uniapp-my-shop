<script setup lang="ts">
import { getHomeBannerAPI, getCategoryMutliAPI, getHomeHotMutliAPI } from '@/services/home'
import CustomNavbar from './componets/CustomNavbar.vue'
import CategoryPanel from './componets/CategoryPanel.vue'
import HotPanel from './componets/HotPanel.vue'
import PageSkeleton from './componets/PageSkeleton.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { useGuessList } from '@/composables/index'
const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
const getCategoryData = async () => {
  const res = await getCategoryMutliAPI()
  categoryList.value = res.result
}
const getHotData = async () => {
  const res = await getHomeHotMutliAPI()
  hotList.value = res.result
}
// 是否加载中标记
const isLoading = ref(false)
// 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getCategoryData(), getHotData()])
  isLoading.value = false
})
// // 获取猜你喜欢组件实例
// const guessRef = ref<XcxGuessInstance>()
// // 滚动触底
// const onScrolltolower = () => {
//   guessRef.value?.getMore()
// }
// 组合式函数
const { guessRef, onScrolltolower } = useGuessList()
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // await getHomeBannerData()
  // await getCategoryData()
  // await getHotData()
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getCategoryData(), getHotData()])
  guessRef.value?.getMore()
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XcxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XcxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
