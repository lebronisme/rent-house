import request from '@/utils/request.js'
import store from '@/store'
/**
 * 获取房屋具体信息接口
 * @param {*} params 传入房间code值
 * @returns
 */
export const getHouseNews = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
/**
 * 查询房屋是否收藏
 * @param { } id
 * @returns
 */
export const getFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    headers: {
      Authorization: store.state.token
    }
  })
}

/**
 * 添加收藏
 * @param {*} id
 * @returns
 */
export const addFavorites = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`,
    headers: {
      Authorization: store.state.token
    }
  })
}
/**
 * 删除收藏
 * @param {*} id
 * @returns
 */
export const delFavorites = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`,
    headers: {
      Authorization: store.state.token
    }
  })
}

export const getCommunity = (name) => {
  return request({
    url: '/area/community',
    params: {
      name,
      id: store.state.nowAddress.value
    }
  })
}
export const getParams = () => {
  return request({
    url: 'houses/params'
  })
}
export const upImg = (data) => {
  return request({
    method: 'POST',
    url: 'houses/image',
    data
  })
}
export const upHouse = (data) => {
  return request({
    method: 'POST',
    url: 'user/houses',
    headers: {
      Authorization: store.state.token
    },
    data
  })
}
