const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl: process.env.VUE_APP_BASE_URL,
    method: 'POST',
    dataType: 'json',
    showLoading: true,
    loadingText: '努力加载中~',
    loadingTime: 400,
    originalData: false,
    loadingMask: true,
    header: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })

  Vue.prototype.$u.http.interceptor.response = (res) => {
    if (res.success === true) {
      return res.data
    } else {
      vm.$u.toast('服务器错误')
      return false
    }
  }
}

export default {
  install
}
