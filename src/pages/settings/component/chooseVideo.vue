<template>
  <view class="imgList">
    <view class="img" v-if="url">
      <video :src="url" style="width:100%;height:100%;"></video>
      <u-icon name="close-circle-fill" size="40" color="red" @click="delVedio"></u-icon>
    </view>

    <view class="selectImg" @click="$chooseVideo">
      <u-icon name="camera" size="100"></u-icon>
      <text>选择视频</text>
    </view>
  </view>
</template>

<script>
import { chooseVideo } from '../../../utils/wxUtils/index'

export default {

  props: {
    url: {
      type: String,
      default: null
    }
  },
  methods: {
    async  $chooseVideo () {
      const { tempFilePath } = await chooseVideo()
      this.$emit('update:url', tempFilePath)
    },
    delVedio () {
      this.$emit('update:url', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
  padding: 0 50rpx;

  .img {
    width: 200rpx;
    height: 200rpx;
    background-color: bisque;
    margin: 6.94rpx;
    position: relative;

    image {
      width: 100%;
      height: 100%;
    }

    u-icon {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .selectImg {
    width: 200rpx;
    height: 200rpx;
    border: solid $from-font-color 1px;
    color: $second-font-color;
    margin: 6.94rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
