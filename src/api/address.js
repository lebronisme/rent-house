import request from '@/utils/request.js'
/**
 * 获取城市列表的接口
 * @param {Number} level
 * @returns
 */
export const getAddressList = (level) => {
  return request({
    url: '/area/city',
    params: {
      level
    }
  })
}

/**
 * 获取热门城市列表的接口
 * @returns
 */
export const getHotAddress = () => {
  return request({
    url: 'area/hot'
  })
}
