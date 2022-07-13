import request from '@/utils/request.js'

/**
 *用户登录请求接口
 * @param {Object} 需要包含账号密码格式：{username:xxx ,password:xxx}
 * @returns
 */
export const LoginAPI = (data) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}
/**
 * 登出接口
 * @returns
 */
export const LogoutAPI = () => {
  return request({
    method: 'POST',
    url: '/user/logout'

  })
}
