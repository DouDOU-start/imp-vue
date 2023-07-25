<script setup lang="ts">
import {onMounted, Ref, ref} from 'vue';
import {useRouter} from 'vue-router';
import {GetSeriesDetail, getSeriesDetail} from "@/api/imp";


const seriesDetailLabel = {
  "seriesDescription": "系列描述",
  "patientNumber": "患者 ID",
  "patientName": "患者姓名",
  "patientSex": "性别",
  "patientAge": "年龄",
  "institution": "机构",
  "modality": "模态",
  "shapeInfo": "形状信息",
  "sliceInfo": "切片信息",
  "bodyPart": "身体检查部位"
}

const seriesDetail: Ref<GetSeriesDetail> = ref({
  seriesNumber: null,
  seriesUid: null,
  seriesDescription: null,
  modality: null,
  pixelSpacing: null,
  sliceThickness: null,
  row: null,
  columns: null,
  patientAge: null,
  seriesAt: null,
  institutionName: null,
  patientNumber: null,
  patientName: null,
  patientSex: null
})

function init() {
  loadSeriesDetail()
}

const $router = useRouter();

async function loadSeriesDetail() {

  const { data } = await getSeriesDetail($router.currentRoute.value.params.seriesId)
  seriesDetail.value = data
  seriesDetail.value.shapeInfo = seriesDetail.value.row + ' * ' + seriesDetail.value.columns + ' * '
}

onMounted(() => {
  init()
});
</script>

<template>
  <el-descriptions title="系列详情">
    <el-descriptions-item v-for="(value, key) in seriesDetailLabel" :label="value">{{seriesDetail[key]}}</el-descriptions-item>
<!--    <el-descriptions-item :label="seriesDetailLabel.patientNumber">{{ seriesDetail.patientNumber }}</el-descriptions-item>-->
  </el-descriptions>
</template>


<style scoped>

</style>