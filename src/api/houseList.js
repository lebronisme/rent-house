import request from '@/utils/request.js'
import store from '@/store/index'

/**
 *  获取房屋筛选信息接口
 * @returns
 */
export const getHouseInfo = () => {
  return request({
    url: '/houses/condition',
    params: {
      id: store.state.nowAddress.value
    }
  })
}
/**
 * 根据条件查询房屋列表接口
 * @param {*} params
 * @returns
 */
export const getHouseList = (params) => {
  return request({
    url: 'houses',
    params
  })
}
