<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref} from 'vue';
import {getSimpleSeries} from "@/api/imp";
import {downLoadSeriesApi} from "@/api/file";
import eventBus from "@/libs/eventBus";

import type {Ref} from 'vue';
import type {GetSimpleSeriesParams} from "@/api/imp";
import {useRouter} from "vue-router";

const router = useRouter()

const seriesColumns = {
  seriesId: {
    label: '系列 ID',
    width: 150
  },
  institutionName: {
    label: '机构',
    width: 200
  },
  patientNumber: {
    label: '患者 ID',
    width: 150
  },
  patientName: {
    label: '患者姓名',
    width: 150
  },
  patientSex: {
    label: '性别',
    width: 100
  },
  patientAge: {
    label: '年龄',
    width: 150
  },
  modality: {
    label: '模态',
    width: 150
  },
  sliceThickness: {
    label: '切片厚度（mm）',
    width: 150
  },
  bodyPart: {
    label: '身体检查部位',
    width: 150
  },
  scanType: {
    label: '扫描类型',
    width: 150
  },
  createdAt: {
    label: '创建时间',
    width: 180
  }
}

const operation = {
  title: '操作',
  detail: '详情',
  download: '下载'
}

const simpleSeriesData = ref([]);
const totalNum = ref();
const pageCount = ref();

const getSimpleSeriesParams: Ref<GetSimpleSeriesParams> = ref({
  currentPage: 1,
  pageSize: 10,
  institutionIds: null,
  modality: null,
  sliceRange: null,
  bodyPartIds: null,
  patientSex: null,
  scanTypeIds: null,
  organIds: null
})

// 初始化
function init() {
  loadSimpleSeries()
}

function filterCondition(condition: any) {

  getSimpleSeriesParams.value.institutionIds = condition.selectInstitution.value.length === 0 ? null : condition.selectInstitution.value.join(",")
  getSimpleSeriesParams.value.modality = condition.selectModality.value.length === 0 ? null : condition.selectModality.value.join(",")
  getSimpleSeriesParams.value.sliceRange = condition.sliceRange == '' ? null : condition.sliceRange
  getSimpleSeriesParams.value.bodyPartIds = condition.selectBodyPart.value.length === 0 ? null : condition.selectBodyPart.value.join(",")
  getSimpleSeriesParams.value.patientSex = condition.selectPatientSex.value  == "" ? null : condition.selectPatientSex
  getSimpleSeriesParams.value.scanTypeIds = condition.selectScanType.value.length === 0 ? null : condition.selectScanType.value.join(",")
  getSimpleSeriesParams.value.organIds = condition.selectOrgan.value.length === 0 ? null : condition.selectOrgan.value.join(",")

  loadSimpleSeries()
}

onMounted(() => {
  init()
  eventBus.on('filterCondition', filterCondition)
  eventBus.on('loadSimpleSeries', loadSimpleSeries)
});

onBeforeUnmount(() => {
  eventBus.off('filterCondition', filterCondition)
  eventBus.off('loadSimpleSeries', loadSimpleSeries)
})

// 加载简要系列列表
async function loadSimpleSeries() {

    const { data } = await getSimpleSeries({
      currentPage: getSimpleSeriesParams.value.currentPage,
      pageSize: getSimpleSeriesParams.value.pageSize,
      institutionIds: getSimpleSeriesParams.value.institutionIds,
      modality: getSimpleSeriesParams.value.modality,
      sliceRange: getSimpleSeriesParams.value.sliceRange,
      bodyPartIds: getSimpleSeriesParams.value.bodyPartIds,
      patientSex: getSimpleSeriesParams.value.patientSex,
      scanTypeIds: getSimpleSeriesParams.value.scanTypeIds,
      organIds: getSimpleSeriesParams.value.organIds,
    });

    console.log('pages:', data.pages)
    console.log('current:', data.current)
    console.log('records:', data.records)
    console.log('size:', data.size)
    console.log('total:', data.total)

    data.records.forEach((item: any) => {
      if (item.bodyPart === null) {
        item.bodyPart = '空'
      }
      if (item.scanType === null) {
        item.scanType = '空'
      }
    })

    simpleSeriesData.value = data.records
    totalNum.value = data.total
    pageCount.value = data.pages

}

// 当前页发生变化
function handleCurrentChange(val: any) {
  console.log(`更新当前页: ${val}`);
  getSimpleSeriesParams.value.currentPage = val
  loadSimpleSeries()
}

// 页数大小发生变化
function handleSizeChange(val: any) {
  console.log(`更新页数大小：${val}`)
  getSimpleSeriesParams.value.pageSize = val
  loadSimpleSeries()
}

function detail(index: number, row: any) {
  router.push(`/seriesDetail/${row.seriesId}`)
}

async function download(seriesId: number) {

  eventBus.emit('updateTask', [
    seriesId,
    {
      "url": "",
      "progress": 0
    }
  ])

  await downLoadSeriesApi(seriesId)

}

defineExpose({ loadSimpleSeries })

</script>

<template>

  <div style="width: 1910px; max-width: 95%; background-color: white; line-height: 40px; margin: 0 auto">
    <el-table stripe class="seriesDataColumn" style="border: none; max-height: 632px; min-height: 640px; overflow: scroll;" :data="simpleSeriesData">
      <el-table-column type="selection" width="50" />
      <el-table-column align="center" v-for="(seriesColumn, key) in seriesColumns" :key="key" :prop="key" :label="seriesColumn.label" :width="seriesColumn.width"/>
      <el-table-column fixed="right" align="center" :label="operation.title" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="detail(scope.$index, scope.row)">{{ operation.detail }}</el-button>
          <el-button link type="primary" size="small" @click="download(scope.row.seriesId)">{{ operation.download }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getSimpleSeriesParams.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="getSimpleSeriesParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
    />
  </div>
</template>