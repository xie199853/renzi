<template>
  <div>
    <!-- action: 远程服务器接口 -->
    <!-- on-preview： 点击预览的回调函数 -->
    <!-- on-remove： 点击删除的回调函数 -->
    <!-- file-list: 上传的文件列表 -->
    <!-- on-change: 上传数据的变化 -->
    <el-upload
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" width="50%" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDITTHvNdgV8ZpsjGbjurc2KQJo7E5mHcg',
  SecretKey: 'zmOn1LaeWmrmV3ReeQ1ReeT7aqsjOs8F'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onRemove() { },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.uploadFile({
        Bucket: 'hangzhou-33-1314348532', /* 填写自己的bucket，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传失败', err)
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
        this.$message.success('上传成功')
      })
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 1 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过1M')
        return false
      }
      return true
    }

  }
}
</script>

<style lang="scss" scoped>
.uploadImg{
width: 148px;
height: 148px;
overflow: hidden
}
</style>
