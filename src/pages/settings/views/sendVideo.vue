<template>
  <view>
    <u-cell-group>
      <u-cell-item title="分类" :value="type" @click="show=true" :value-style="{'color':'#589af1'}"></u-cell-item>
      <u-field
        v-model="code"
        placeholder="文案"
        type="textarea"
        label-width="0"
        :maxlength="-1"
        style="height:347.22rpx;"
      />

      <!-- <u-upload
        :action="action"
        :file-list="fileList"
        @on-uploaded="onUploaded"
        :auto-upload="false"
      ></u-upload>-->

      <ChooseVideo :url.sync="videoUrl"></ChooseVideo>
    </u-cell-group>

    <view class="send-container">
      <u-button size="medium" type="primary" shape="circle">立即发布</u-button>
      <view>
        完成立即发布表示同意
        <text @click="openAgreement" style="color:#589af1;">《111111》</text>
      </view>
    </view>

    <u-select v-model="show" mode="single-column" :list="typeList" @confirm="confirm"></u-select>
  </view>
</template>

<script>
import ChooseVideo from '../component/chooseVideo.vue'

export default {
  components: {
    ChooseVideo
  },
  data () {
    return {
      typeList: [
        { label: 'a', value: 1 },
        { label: 'e', value: 2 },
        { label: 'f', value: 3 },
        { label: 'z', value: 4 },
        { label: 't', value: 5 },
        { label: 'q', value: 6 },
        { label: 'g', value: 7 }
      ],
      type: '请选择',
      videoUrl: null
    }
  },
  methods: {
    confirm (val) {
      this.type = val[0].label
    },
    openAgreement () {
      console.log(1111111)
    }
  }
}
</script>

<style lang="scss" scoped>
.send-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 48.61rpx;

  view {
    margin-top: 27.78rpx;
  }
}
</style>
