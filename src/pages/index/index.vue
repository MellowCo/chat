<template>
  <view class="content">
    <u-swiper :list="images" :effect3d="true" :height="358"></u-swiper>
    <u-search
      height="64"
      margin="21rpx 27rpx"
      :show-action="false"
      @search="search"
      v-model="keyWord"
    ></u-search>

    <u-card
      v-for="(item, index) in tweets"
      :key="item.tweetid"
      :show-head="false"
      margin="0"
      padding="27.8"
    >
      <view slot="body" class="main">
        <view class="avatar">
          <u-image width="68.1rpx" height="68.1rpx" :src="item.avatar" mode="widthFix"></u-image>
        </view>

        <view class="main-container">
          <view class="container-top">
            <view class="name">{{ item.name }}</view>
            <view class="icons">
              <u-icon
                name="thumb-up"
                :color="item.islike ? '#589af1' : '#454545'"
                size="35"
                @click="like(item.islike, index)"
              ></u-icon>
              <text style="margin:0 6.9rpx">{{ item.like }}</text>
              <u-icon
                name="star"
                :color="item.isCollection ? '#589af1' : '#454545'"
                size="35"
                @click="collection(item.isCollection, index)"
              ></u-icon>
            </view>
          </view>

          <view class="container-text">
            <text>{{ item.text }}</text>
            <view v-if="item.img.length === 1" style="margin: 13.9rpx 0;display:flex;">
              <image
                mode="aspectFill"
                :src="citem"
                v-for="(citem, key) in item.img"
                :key="key"
                style="width:70%;"
                @click="viewImgs(item.img, key)"
                lazy-load
              />
            </view>

            <view
              v-else-if="item.img.length <= 3 && item.img.length > 1"
              style="margin: 13.9rpx 0;display:flex;"
            >
              <image
                mode="aspectFill"
                :src="citem"
                v-for="(citem, key) in item.img"
                :key="key"
                style="width:200rpx;padding:2rpx;height:200rpx;"
                @click="viewImgs(item.img, key)"
                lazy-load
              />
            </view>

            <view v-else style="margin: 13.9rpx 0;display:flex;flex-wrap:wrap;">
              <image
                mode="aspectFill"
                :src="citem"
                v-for="(citem, key) in item.img"
                :key="key"
                style="width:200rpx;padding:2rpx;height:200rpx;"
                @click="viewImgs(item.img, key)"
                lazy-load
              />
            </view>

            <text>{{ item.time | timeToNow }}</text>
          </view>
        </view>
      </view>

      <template #foot>
        <view class="container-bottom">
          <button class="icon-item" @click="copyText(item.text)">
            <u-icon name="file-text" color="#454545" label="复制文案" label-pos="left"></u-icon>
          </button>
          <button class="icon-item" @click="saveImgs(item.img)" :disabled="imgDisable">
            <u-icon name="download" color="#454545" label="一键保存" label-pos="left"></u-icon>
          </button>
          <button class="icon-item" open-type="share">
            <u-icon name="share" color="#454545" label="分享" label-pos="left"></u-icon>
          </button>
        </view>
      </template>
    </u-card>
    <u-loadmore :status="status" :load-text="loadText" />
    <u-back-top :scroll-top="scrollTop" bottom="100"></u-back-top>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import * as service from './service'
import {
  copy,
  download,
  toastLoaing,
  auth,
  toastText,
  showShare
} from '../../utils/wxUtils/index'
import content from '../../utils/dict/content'
import scope from '../../utils/dict/authScope'

export default {
  data () {
    return {
      images: [],
      tweets: [],
      keyWord: '',
      scrollTop: 0,
      status: 'loadmore',
      loadText: {
        loadmore: '上拉或点击加载更多',
        loading: '正在加载,请喝杯茶...',
        nomore: '实在没有了'
      },
      imgDisable: false
    }
  },
  async onLoad () {
    try {
      uni.showLoading({
        title: '加载中...'
      })
      await this.getSwipers(false)
      await this.getTweets(false)
      showShare()
    } finally {
      uni.hideLoading()
    }
  },
  onPageScroll (e) {
    this.scrollTop = e.scrollTop
  },
  // 分享朋友圈
  onShareAppMessage () {
    return {
      title: 'chat-朋友圈',
      path: 'pages/index/index'
    }
  },
  // 到底加载
  async onReachBottom () {
    try {
      this.status = 'loading'
      const { data } = await service.tweets(false)
      this.tweets = Object.freeze([...this.tweets, ...data.tweets])
    } finally {
      this.status = 'loadmore'
    }
  },
  // 下拉刷新
  async onPullDownRefresh () {
    try {
      await this.getTweets()
      await this.getSwipers()
    } finally {
      uni.stopPullDownRefresh()
    }
  },
  methods: {
    async getSwipers (loading = true) {
      const { data } = await service.swipers(loading)
      this.images = Object.freeze(data)
    },
    async getTweets (loading = true) {
      const { data } = await service.tweets(loading)
      this.tweets = Object.freeze(data.tweets)
      // this.tweets = data.tweets
    },
    search (val) {
      try {
        this.getTweets()
      } finally {
        this.keyWord = ''
      }
    },
    // 复制文本
    copyText (text) {
      copy(text)
    },
    // 预览图片
    viewImgs (imgs, index) {
      uni.previewImage({
        current: index,
        urls: imgs
      })
    },
    // 保存图片
    async saveImgs (imgs) {
      try {
        this.imgDisable = true

        // 检查授权
        await auth(scope.Photos, content.Photos)

        // 多张图片 遍历
        for (let index = 0; index < imgs.length; index++) {
          toastLoaing({ title: `保存第${index + 1}张图片` })

          const { tempFilePath } = await download(imgs[index])

          uni.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            fail: e => {
              toastText({ title: `第${index + 1}张图片保存失败` })
            }
          })
        }
      } finally {
        this.imgDisable = false
      }
    },
    // 点赞
    async like (flag, index) {
      try {
        const { success } = await service.like()
        if (success) {
          const _tweets = JSON.parse(JSON.stringify(this.tweets))
          _tweets[index].islike = !flag
          flag ? _tweets[index].like -= 1 : _tweets[index].like += 1
          this.tweets = Object.freeze(_tweets)
        } else {
          throw new Error()
        }
      } catch {
        toastText({ title: '点赞失败' })
      }
    },
    // 收藏
    async   collection (flag, index) {
      try {
        const { success } = await service.like()
        if (success) {
          const _tweets = JSON.parse(JSON.stringify(this.tweets))
          _tweets[index].isCollection = !flag
          this.tweets = Object.freeze(_tweets)
        } else {
          throw new Error()
        }
      } catch (e) {
        toastText({ title: '收藏失败' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;

  .avatar {
    flex: 1;
  }

  .main-container {
    flex: 10;
    margin-left: 13.9rpx;

    .container-top {
      display: flex;
      justify-content: space-between;
      font-size: 27.8rpx;

      .name {
        color: $chat-theme-color;
      }
      .icons {
        .u-icon {
          margin: 0 13.9rpx;
        }

        text {
          font-size: 28rpx;
        }
      }
    }
    .container-text {
      margin-top: 13.9rpx;
    }
  }
}
.container-bottom {
  display: flex;
  .icon-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    &::after {
      border: none;
    }
  }
}
</style>
