<template>
  <view class="imgList">
    <view v-for="(item,index) in paths" :key="index" class="img">
      <image :src="item" mode="aspectFill" @click="preview(index)" />
      <u-icon name="close-circle-fill" size="40" color="red" @click="delImgByIndex(index)"></u-icon>
    </view>

    <view class="selectImg" @click="$chooseImg">
      <u-icon name="camera" size="100"></u-icon>
      <text>选择图片</text>
    </view>
  </view>
</template>

<script>
import { chooseImg } from '../../../utils/wxUtils/index'

export default {
  props: {
    paths: {
      type: Array,
      default: () => []
    },
    files: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async $chooseImg () {
      try {
        const { tempFilePaths, tempFiles } = await chooseImg()
        this.$emit('update:paths', tempFilePaths)
        this.$emit('update:files', tempFiles)
      } catch (e) {
        console.log(e)
      }
    },
    delImgByIndex (index) {
      this.paths.splice(index, 1)
      this.files.splice(index, 1)
      this.$emit('update:paths', this.paths)
      this.$emit('update:files', this.files)
    },
    preview (index) {
      uni.previewImage({
        urls: this.paths,
        current: index
      })
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
