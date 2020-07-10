<template>
  <view>
    <u-cell-group>
      <u-cell-item title="分类" :value="type" @click="show=true" :value-style="{'color':'#589af1'}"></u-cell-item>
      <u-field v-model="code" placeholder="文案" type="textarea" label-width="0" :maxlength="-1" />

      <!-- <u-upload
        :action="action"
        :file-list="fileList"
        @on-uploaded="onUploaded"
        :auto-upload="false"
      ></u-upload>-->

      <ChooseImg :paths.sync="pathList" :files.sync="fileList"></ChooseImg>
    </u-cell-group>

    <u-select v-model="show" mode="single-column" :list="typeList" @confirm="confirm"></u-select>
  </view>
</template>

<script>
import ChooseImg from '../component/chooseImg'

export default {
  components: {
    ChooseImg
  },
  data () {
    return {
      show: false,
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
      action: 'http://www.example.com/upload',
      fileList: [],
      pathList: []
    }
  },
  methods: {
    confirm (val) {
      this.type = val[0].label
    }
  }
}
</script>
