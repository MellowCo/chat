<template>
  <view class="content">
    <u-swiper :list="images" :effect3d="true" :height="358"></u-swiper>
    <u-search height="64" margin="21rpx 27rpx" :show-action="false" @search="search" v-model="keyWord"></u-search>

    <u-card v-for="item in tweets" :key="item.tweetid">
      <view class="avatar">
        <image :src="item.avatar" mode="aspectFill"></image>
      </view>

      <view class="main-container">
        <view class="container-top">
          <view class="name">{{ item.name }}</view>
          <view class="icons">
            <u-icon name="thumb-up" color="#2979ff" size="28">{{ item.like }}</u-icon>
            <u-icon name="star" color="#2979ff" size="28">{{ item.collection }}</u-icon>
          </view>
        </view>
        <view class="container-text"></view>
        <view class="container-bottom"></view>
      </view>
    </u-card>
  </view>
</template>

<script>
import * as service from './service'

export default {
  data () {
    return {
      images: []
    }
  },
  onLoad () {
    this.getImgs()
    this.getTweets()
  },
  methods: {
    async getImgs () {
      const data = await service.swipers()
      this.images = Object.freeze(data)
    },
    async getTweets () {
      const data = await service.tweets()
      console.log(data)
    },
    search (val) {
      console.log(val)
    }
  }
}
</script>
