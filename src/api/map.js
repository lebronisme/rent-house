import request from '@/utils/request.js'
export const getMapInfo = (id) => {
  return request({
    url: 'area/map',
    params: {
      id
    }
  })
}
