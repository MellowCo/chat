export function copy (text) {
  uni.setClipboardData({
    data: text,
    success () {
      uni.showToast({
        title: '文本复制成功',
        duration: 1000
      })
    },
    fail () {
      uni.showToast({
        title: '文本复制失败',
        duration: 1000
      })
    }
  })
}
