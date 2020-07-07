import request from '../../utils/request/request'
import dict from '../../utils/dict/index'

// 轮播图
export function swipers () {
  return request.get({ url: dict.swipers })
}

// 推文
export function tweets () {
  return request.get({ url: dict.tweets })
}
