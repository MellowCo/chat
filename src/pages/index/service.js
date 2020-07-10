import request from '../../utils/request/request'
import dict from '../../utils/dict/index'

// 轮播图
export function swipers () {
  return request({
    url: dict.swipers
  })
}

// 推文
export function tweets (loading) {
  return request({
    url: dict.tweets,
    loading
  })
}
// 点赞
export function like () {
  return request({
    url: dict.like,
    loading: false
  })
}
