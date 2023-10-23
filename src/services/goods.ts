import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'
// 商品详情接口
export const getGoodsAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
