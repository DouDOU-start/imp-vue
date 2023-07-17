<script setup lang="ts">

import SimpleSeriesList from "@/components/SimpleSeriesList.vue";
import {ref} from 'vue';
import {uploadDicomApi} from "@/api/file";
import type {TaskItem} from "@/components/TaskList.vue";
import TaskList from "@/components/TaskList.vue";
import {ElNotification} from "element-plus";
import FilterCondition from "@/components/FilterCondition.vue";
import eventBus from "@/libs/eventBus";

const upload = ref<any>()

const taskMap = ref(new Map<string, TaskItem>())

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

  eventBus.emit('loadSimpleSeries')

}

// 文件发生改变
function fileChange() {
  upload.value.clearFiles() //清除文件对象
}

</script>

<template>
  <div>
    <el-container>
      <el-header>影像云</el-header>
      <el-main style="background-color: #f8f8f8; height: 1000px; padding: 10px">
        <el-container>
          <el-main>

            <FilterCondition />

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

          </el-main>
          <el-aside width="500px">
            <TaskList class="task-list" :task-map="taskMap"></TaskList>
          </el-aside>

        </el-container>

        <div class="simpleSeriesList" style="width: 100%;">
          <SimpleSeriesList />
        </div>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style lang="less">
.task-list {

}
</style>