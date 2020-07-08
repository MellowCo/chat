export default function ({ url, data, method, baseUrl = process.env.VUE_APP_BASE_URL, loading = true }) {
  if (loading) {
    uni.showLoading({
      title: '加载中'
    })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}${url}`,
      data,
      method,
      success: res => {
        resolve(res.data)
      },
      fail: res => {
        reject(res)
      },
      complete: () => {
        if (loading) {
          uni.hideLoading()
        }
      }
    })
  })
}
