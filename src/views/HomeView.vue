<script setup lang="ts">

import SimpleSeriesList from "@/components/SimpleSeriesList.vue";
import {getInstitution} from "@/api/dimension";
import {nextTick, onMounted, ref} from 'vue';
import {uploadDicomApi} from "@/api/file";
import {ElNotification} from "element-plus";
import type {Institution} from "@/api/dimension";


const institution = ref<Array<Institution>>();
const selectInstitution = ref()
const upload = ref<any>()

const RefSimpleSeriesList = ref<any>()


onMounted(() => {
  LoadInstitution()
});

// 加载机构列表
async function LoadInstitution() {
  let {data} = await getInstitution();
  institution.value = data
}

// 过滤查询
function filter() {
  console.log(`机构：${selectInstitution.value}`)
  nextTick(() => {
    RefSimpleSeriesList.value.LoadSimpleSeries()
  })
}

function onBeforeUploadDicom(file: FileList) {
  console.log(`上传Dicom文件前置，${file}`)
}

// 上传DICOM文件
function uploadDicom(param: any) {

  const formData = new FormData()
  formData.append('file', param.file)

  uploadDicomApi(formData).then(res => {
    console.log(`上传Dicom文件成功，${res}`)
    ElNotification({
      message: `${param.file.name} 上传成功！`,
      type: 'success',
    })
  }).catch(res => {
    console.error(`上传Dicom文件失败，${res}`)
    ElNotification({
      message: `${param.file.name} 上传失败，${res.response.data.msg}`,
      type: 'error',
    })
  })

}

// 文件发生改变
function fileChange() {
  upload.value.clearFiles() //清除文件对象
}

</script>

<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-main style="background-color: #f8f8f8; height: 1000px; padding: 20px">

        <div class="filterCondition">
          机构：
          <el-select multiple :clearable="true" v-model="selectInstitution" placeholder="全部">
            <el-option
                v-for="item in institution"
                :key="item.id"
                :label="item.institutionName"
                :value="item.id"
            />
          </el-select>
        </div>
        <el-button type="primary" @click="filter">确认</el-button>

        <!--        上传DICOM文件-->
        <el-upload
            class="upload-dicom"
            ref="upload"
            action="string"
            :before-upload="onBeforeUploadDicom"
            :http-request="uploadDicom"
            :on-change="fileChange"
            multiple>
          <el-button size="small" type="primary">上传DICOM文件</el-button>
        </el-upload>

        <div class="simpleSeriesList">
          <SimpleSeriesList ref="RefSimpleSeriesList" style="margin: 100px auto;"
                            :institution-ids="selectInstitution"></SimpleSeriesList>
        </div>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>