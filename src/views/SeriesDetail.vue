<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {getSeriesDetail, getSeriesInstance, GetSeriesLabel, getSeriesLabel} from "@/api/imp";
import type {Ref} from 'vue'
import type {GetSeriesDetail, GetSeriesInstance} from '@/api/imp'
import {downLoadSeriesLabelApi} from "@/api/file";


const seriesDetailLabel = {
  "seriesDescription": "系列描述",
  "patientNumber": "患者 ID",
  "patientName": "患者姓名",
  "patientSex": "性别",
  "patientAge": "年龄",
  "institutionName": "机构",
  "modality": "模态",
  "shapeInfo": "形状信息",
  "sliceInfo": "切片信息",
  "bodyPart": "身体检查部位"
}

const seriesDetail: Ref<GetSeriesDetail> = ref({
  seriesNumber: '',
  seriesUid: '',
  seriesDescription: '',
  modality: '',
  pixelSpacing: '',
  sliceThickness: 0,
  row: 0,
  columns: 0,
  instanceNum: 0,
  patientAge: '',
  seriesAt: '',
  institutionName: '',
  patientNumber: '',
  patientName: '',
  patientSex: ''
})

const seriesLabel: Ref<GetSeriesLabel[]> = ref([{
  id: 0,
  fileName: '',
  fileLocation: '',
  createdAt: ''
}])

const seriesInstance: Ref<GetSeriesInstance[]> = ref([{
  id: 0,
  instanceNumber: 0,
  instanceUid: '',
  sliceLocation: 0,
  imageUrl: ''
}])

function init() {
  loadSeriesDetail()
  loadSeriesLabel()
  loadSeriesInstance()
}

const $router = useRouter();

async function loadSeriesDetail() {
  const {data} = await getSeriesDetail($router.currentRoute.value.params.seriesId as string)
  seriesDetail.value = data
  seriesDetail.value.shapeInfo = seriesDetail.value.row + ' * ' + seriesDetail.value.columns + ' * ' + seriesDetail.value.instanceNum
  seriesDetail.value.sliceInfo = seriesDetail.value.pixelSpacing + ' * ' + seriesDetail.value.sliceThickness
}

async function loadSeriesLabel() {
  const {data} = await getSeriesLabel($router.currentRoute.value.params.seriesId as string)
  seriesLabel.value = data
}

async function loadSeriesInstance() {
  const {data} = await getSeriesInstance($router.currentRoute.value.params.seriesId as string)
  seriesInstance.value = data
  seriesInstance.value.forEach(instance => {
    instance.imageUrl = '/api/file/jpg/' + instance.id
  })
}

function downloadLabel(val: any) {
  downLoadSeriesLabelApi(val)
  console.log(val)
}

onMounted(() => {
  init()
});
</script>

<template>

  <el-descriptions title="系列详情">
    <el-descriptions-item v-for="(value, key) in seriesDetailLabel" :key="key" :label="value">{{ seriesDetail[key] }}
    </el-descriptions-item>
  </el-descriptions>

  <div class="label-list">
    <el-table :data="seriesLabel" style="width: 100%" max-height="250">
      <el-table-column fixed prop="fileName" label="标注文件" width="150"/>
      <el-table-column fixed prop="createdAt" label="上传时间" width="200"/>
      <el-table-column label="" width="120">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="downloadLabel(scope.row.fileLocation)"
          >
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="instance-list">
    <div v-for="item in seriesInstance" :key="item.id">
      <div class="image-container">
        <div class="image-text">
          Instance Number: {{ item.instanceNumber }}
          <br>
          Slice Location: {{ item.sliceLocation }}
        </div>
        <el-image class="img" :src="item.imageUrl"/>
      </div>
    </div>
  </div>

</template>


<style lang="less">
.label-list {
  width: 90%;
  height: 200px;
  margin: 0 auto;
  //border: 2px solid red;
  border-radius: 15px;
}


.instance-list {
  width: 95%;
  max-width: 1512px;
  height: 900px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: scroll;
  z-index: -1;
  border: 5px solid #8f8f8f;
}

.image-container {
  position: relative;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  width: 300px; /* 调整div宽度 */
  height: 300px; /* 调整div高度 */
  border: 1px solid #ccc;
  float: left;

  .image-text {
    position: absolute;
    color: #cbcbcb;
    font-size: 12px;
    z-index: 1;
  }

  .img {
    max-width: 100%;
    max-height: 100%;
    z-index: 0;
  }

}
</style>