import request from '@/utils/request.js'
import store from '@/store'
/**
 * 获取用户信息接口
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/user',
    headers: {
      Authorization: store.state.token
    }
  })
}
export const getFavoritesList = () => {
  return request({
    url: 'user/favorites',
    headers: {
      Authorization: store.state.token
    }
  })
}
export const getUpHousesList = () => {
  return request({
    url: '/user/houses',
    headers: {
      Authorization: store.state.token
    }
  })
}
