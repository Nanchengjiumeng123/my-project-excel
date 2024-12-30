<template>
  <div class="hello">
    <layout>
    <div class="main-content">
    <div class="left-content-container">
      <p style="color: #409EFF">原始Excel</p>
      <div class="img-style" v-if=!file1NotUploaded>
        <img style="width: 50px; height: 50px" :src="require('@/assets/done.png')">
      </div>
      <el-upload
          v-if=file1NotUploaded
          ref="uploadInstance"
          :auto-upload="false"
          action="#"
          drag
          :on-change="handleChangeOne"
          :show-file-list="false"
          :limit="1"
          accept=".xls,.xlsx"
      >
        <div class="upload-text">
          <i class="el-icon-upload" />
          <p>上传Excel</p>
          <p>拖拽Excel或<em>点击上传</em>，支持xlx、xlsx格式</p>
        </div>
      </el-upload>
    </div>

    <div class="right-content-container">
      <p style="color: #409EFF">已分类Excel</p>
      <div class="img-style" v-if=!file2NotUploaded>
        <img style="width: 50px; height: 50px" :src="require('@/assets/done.png')">
      </div>
      <el-upload
          v-if="file2NotUploaded"
          ref="uploadInstance"
          :auto-upload="false"
          action="#"
          drag
          :on-change="handleChangeTwo"
          :show-file-list="false"
          :limit="1"
          accept=".xls,.xlsx"
      >
        <div class="upload-text">
          <i class="el-icon-upload" />
          <p>上传Excel</p>
          <p>拖拽Excel或<em>点击上传</em>，支持xlx、xlsx格式</p>
        </div>
      </el-upload>
    </div>
    </div>
      <el-row>
      <el-button type="primary" style="margin-top: 2%" @click="deleteFile()">重置</el-button>
      <el-button type="primary" style="margin-top: 2%" @click="uploadFile()">处理文件</el-button>
      </el-row>
    </layout>
  </div>

</template>

<script>
import Layout from '@/views/components/Layout.vue'
import dayjs from 'dayjs';
import axios from 'axios';
export default {
  components: {
    Layout
  },
  data() {
    return {
      files: [], // 存储上传的文件
      file1NotUploaded: true,
      file2NotUploaded: true,
    }
  },
  methods: {
    handleChangeOne(file) {
      this.files[0] = file.raw;
      if (this.files.length > 0 && this.files[0]) {
        this.file1NotUploaded = false;
      }
    },
    handleChangeTwo(file) {
      this.files[1] = file.raw;
      if (this.files.length > 0 && this.files[1]) {
        this.file2NotUploaded = false;
      }
    },
    //上传
    async uploadFile(param) {
      if (this.files.length < 2) {
        this.$message.error('请选中要上传的两个 Excel 文件!')
        return;
      }
      // 创建 FormData 对象
      const formData = new FormData();
      this.files.forEach((file, index) => {
        console.log(file)
        formData.append(`file${index + 1}`, file); // 使用 file1 和 file2 作为字段名
      });

      console.log("-----------" + JSON.stringify(formData))
      // try {
        // 发送 POST 请求到后端接口
        const response = await axios.post('http://localhost:8081/analysisExcel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob' // 将响应类型设置为 blob
        }).then((response) => {
          console.log('请求本地接口OK')
          let fileName = '差异信息' +  dayjs().format('YYYYMMDDHHmmss') + '.xlsx'
          let blob = new Blob([response.data]);//response为后端传的流文件
          let url = window.URL.createObjectURL(blob);
          let downloadElement = document.createElement("a");
          downloadElement.style.display = "none";
          downloadElement.href = url;
          downloadElement.download = fileName;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(url);
          this.$message.success('处理成功!')
        })
    },

    deleteFile(){
      this.files= [];
      this.file1NotUploaded=true;
      this.file2NotUploaded=true;
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  margin-top: 1%;
}

.left-content-container {
  width: 50%;
  padding: 30px 40px 40px 40px;
  border-radius: 8px;
  margin-right: 1%;
  background-color: #F6F6F6;
  border: 0px solid #979797;
  height: 300px;
}

.right-content-container {
  width: 50%;
  height: 300px;
  padding: 30px 40px 40px 40px;
  border-radius: 8px;
  background-color: #F6F6F6;
  border: 0px solid #979797;
}


.upload-text {
  margin-top: 10px;
  color: #999;

em{
  color: #409EFF;
  font-style: normal;
}
}

:deep(.el-upload) {
  width: 100%;
  height: 250px;
}

:deep(.el-upload-dragger) {
  background-color: #F6F6F6;
  border: 0px;
  width: 100%;
  height: 100%;
}

:deep(.el-button--primary) {
  width: 200px;
  border-radius: 6px;
}
.img-style {
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
