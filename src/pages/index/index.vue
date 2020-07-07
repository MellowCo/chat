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

    <u-card v-for="item in tweets" :key="item.tweetid" :show-head="false" margin="0" padding="27.8">
      <view slot="body" class="main">
        <view class="avatar">
          <u-image width="68.1rpx" height="68.1rpx" :src="item.avatar" mode="widthFix"></u-image>
        </view>

        <view class="main-container">
          <view class="container-top">
            <view class="name">{{ item.name }}</view>
            <view class="icons">
              <u-icon name="thumb-up" color="#454545" size="35"></u-icon>
              <text style="margin:0 6.9rpx">{{item.like}}</text>
              <u-icon name="star" color="#454545" size="35"></u-icon>
              <text style="margin:0 6.9rpx">{{item.collection}}</text>
            </view>
          </view>

          <view class="container-text">
            <text>{{item.text}}</text>
            <view v-if="item.img.length === 1" style="margin: 13.9rpx 0;display:flex;">
              <image
                mode="aspectFill"
                :src="citem"
                v-for="(citem,key) in item.img"
                :key="key"
                style="width:70%;"
                @click="viewImgs(item.img,key)"
              />
            </view>

            <view
              v-else-if="item.img.length <= 3 && item.img.length >1"
              style="margin: 13.9rpx 0;display:flex;"
            >
              <image
                mode="aspectFill"
                :src="citem"
                v-for="(citem,key) in item.img"
                :key="key"
                style="width:200rpx;padding:2rpx;height:200rpx;"
                @click="viewImgs(item.img,key)"
              />
            </view>

            <view v-else style="margin: 13.9rpx 0;display:flex;flex-wrap:wrap;">
              <image
                mode="aspectFill"
                :src="citem"
                v-for="(citem,key) in item.img"
                :key="key"
                style="width:200rpx;padding:2rpx;height:200rpx;"
                @click="viewImgs(item.img,key)"
              />
            </view>

            <text>{{item.time | timeToNow}}</text>
          </view>
        </view>
      </view>

      <template #foot>
        <view class="container-bottom">
          <view class="icon-item">
            <u-icon
              name="file-text"
              color="#454545"
              label="复制文案"
              label-pos="left"
              @click="copyText(item.text)"
            ></u-icon>
          </view>
          <view class="icon-item">
            <u-icon
              name="download"
              color="#454545"
              label="一键保存"
              label-pos="left"
              @click="saveImgs(item.img)"
            ></u-icon>
          </view>
          <view class="icon-item">
            <u-icon name="share" color="#454545" label="分享" label-pos="left"></u-icon>
          </view>
        </view>
      </template>
    </u-card>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
import * as service from './service'
import { copy } from '../../utils/copy/index'

export default {
  data () {
    return {
      images: [],
      tweets: [],
      keyWord: ''
    }
  },
  onLoad () {
    this.getSwipers()
    this.getTweets()
  },
  async onPullDownRefresh () {
    try {
      await this.getSwipers()
      await this.getTweets()
    } finally {
      uni.stopPullDownRefresh()
    }
  },
  methods: {
    async getSwipers () {
      const data = await service.swipers()
      this.images = Object.freeze(data)
    },
    async getTweets () {
      const data = await service.tweets()
      this.tweets = Object.freeze(data.tweets)
    },
    search (val) {
      console.log(val)
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
    saveImgs (imgs) {
      for (let index = 0; index < imgs.length; index++) {
        const _this = this
        const { path } = uni.getImageInfo({
          src: imgs[index]
        })
        console.log(path)

        uni.saveImageToPhotosAlbum({
          filePath: path,
          success () {
            _this.$refs.uToast.show({
              title: `第${index}张图片保存成功`,
              type: 'success'
            })
          },
          fail (e) {
            console.log(e)

            _this.$refs.uToast.show({
              title: `第${index}张图片保存失败`,
              type: 'error'
            })
          }
        })
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
  }
}
</style>
