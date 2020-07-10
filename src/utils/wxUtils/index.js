// 复制剪切板
import dict from '../dict/index'

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
    // complete: () => {
    //   uni.hideToast()
    // }
  })
}

// 下载文件
export function download (url) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      fail: res => {
        reject(res)
      },
      success: res => {
        resolve(res)
      }
    })
  })
}

// toast loading
export function toastLoaing ({ title, time = 1500, isClick = true }) {
  uni.showToast({
    title,
    duration: time,
    mask: isClick,
    icon: 'loading'
  })
}

export function toastSuccess ({ title, time = 1500, isClick = true }) {
  uni.showToast({
    title,
    duration: time,
    mask: isClick
  })
}

export function toastText ({ title, time = 1500, isClick = true }) {
  uni.showToast({
    title,
    duration: time,
    mask: isClick,
    icon: 'none'
  })
}

// 权限认证
export function auth (scope, content = '内容', title = '是否打开设置页面') {
  return new Promise((resolve, reject) => {
    uni.authorize({
      scope,
      success: res => {
        resolve(res)
      },
      fail: res => {
        uni.showModal({
          title,
          content,
          success: res => {
            if (res.confirm) {
              uni.openSetting({
                success: res => {
                },
                fail: res => {
                  reject(res)
                }
              })
            } else {
              reject(res)
            }
          }
        })
      }
    })
  })
}

// 打开分享按钮
export function showShare () {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}

export function login () {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}
//
export function isLogin () {
  const _isLogin = uni.getStorageSync(dict.isLogin)
  return _isLogin !== 1
}

// 选择图片
export function chooseImg () {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}
