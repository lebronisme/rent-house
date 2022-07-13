import request from '@/utils/request.js'
import store from '@/store/index'
/**
 * 获租房群信息接口
 * @returns
 */
export const getGroupInfo = () => {
  return request({
    url: '/home/groups',
    params: {
      area: store.state.nowAddress.value
    }
  })
}
