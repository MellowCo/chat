<template>
  <view>
    <view class="header-container">
      <view class="circle-backgroup"></view>
      <view class="avatar-container">
        <u-avatar :src="userInfo.avatarUrl" mode="circle" :size="145.83"></u-avatar>
        <text>{{userInfo.nickName}}</text>
        <u-button
          v-if="showLogin"
          type="primary"
          size="mini"
          open-type="getUserInfo"
          @getuserinfo="login"
        >登录</u-button>
        <u-button v-if="!showLogin" type="primary" size="mini" @click="showTweetSelect = true">发布创意</u-button>
      </view>
    </view>

    <u-cell-group>
      <u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
      <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
    </u-cell-group>

    <u-action-sheet
      border-radius="30"
      :mask-close-able="false"
      :list="tweetType"
      @click="selectTweetType"
      v-model="showTweetSelect"
    ></u-action-sheet>
  </view>
</template>

<script>
import { login, toastText, toastSuccess, isLogin } from '../../utils/wxUtils'
import dict from '../../utils/dict/index'

export default {

  onLoad () {
    this.getLocalUserInfo()
  },
  methods: {
    async login (res) {
      const userInfo = res.detail.userInfo
      if (userInfo) {
        try {
          const data = await login()
          uni.setStorageSync(dict.isLogin, 1)
          uni.setStorageSync(dict.userInfo, JSON.stringify(userInfo))
          uni.setStorageSync(dict.code, JSON.stringify(data))
          this.userInfo = userInfo
          this.showLogin = false

          toastSuccess({ title: '登录成功' })
        } catch (e) {
          toastText({ title: '登录失败' })
        }
      }
    },
    getLocalUserInfo () {
      const _flag = isLogin()

      if (!_flag) {
        const userInfo = uni.getStorageSync(dict.userInfo)
        if (userInfo) {
          this.userInfo = JSON.parse(userInfo)
        }
      }
      this.showLogin = _flag
    },
    selectTweetType (index) {
      switch (index) {
        case 0:
          uni.navigateTo({
            url: '/pages/settings/views/sendImg'
          })
          break
        case 1:
          uni.navigateTo({
            url: '/pages/settings/views/sendVideo'
          })
          break
      }
    }
  },
  data () {
    return {
      userInfo: {
        nickName: null,
        avatarUrl: null
      },
      showLogin: true,
      showTweetSelect: false,
      tweetType: [
        { text: '图片' },
        { text: '视频' }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.header-container {
  height: 496.53rpx;
  position: relative;
  .circle-backgroup {
    background-color: $chat-theme-color;
    height: 263.89rpx;
    width: 150%;
    border-radius: 0 0 50% 50%;
    position: relative;
    left: -25%;
  }

  .avatar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-30%);

    text {
      color: $chat-theme-color;
      font-size: 41.67rpx;
      margin: 13.89rpx 0;
    }

    /deep/.u-btn--primary {
      background-color: #589af1;
    }
  }
}
</style>
