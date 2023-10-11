import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'
// 广告接口
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: { distributionSite },
  })
}
