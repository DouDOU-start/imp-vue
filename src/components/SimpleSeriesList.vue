<script setup lang="ts">

import {onMounted, ref} from 'vue';
import {getSimpleSeries} from "@/api/imp";


type TData = { institutionIds: []}
const props = defineProps<TData>()

const seriesColumns = {
  seriesId: '系列 ID',
  institutionName: '机构',
  patientNumber: '患者 ID',
  patientName: '患者姓名',
  patientSex: '性别',
  patientAge: '年龄',
  modality: '模态',
  sliceThickness: '切片厚度（mm）',
  bodyPart: '身体检查部位',
  createdAt: '创建时间',
}

const operation = {
  title: '操作',
  detail: '详情',
  download: '下载'
}

const simpleSeriesData = ref([]);
const totalNum = ref();
const pageCount = ref();
const currentPage = ref(1);
const pageSize = ref(10);


onMounted(() => {
  LoadSimpleSeries()
});

// 加载简要系列列表
async function LoadSimpleSeries() {

    const { data } = await getSimpleSeries({
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      institutionIds: props.institutionIds.length === 0 ? null : props.institutionIds.join(","),
    });

    console.log('pages:', data.pages)
    console.log('current:', data.current)
    console.log('records:', data.records)
    console.log('size:', data.size)
    console.log('total:', data.total)

    simpleSeriesData.value = data.records
    totalNum.value = data.total
    pageCount.value = data.pages

}

// 当前页发生变化
function handleCurrentChange(val: any) {
  console.log(`更新当前页: ${val}`);
  currentPage.value = val
  LoadSimpleSeries()
}

// 页数大小发生变化
function handleSizeChange(val: any) {
  console.log(`更新页数大小：${val}`)
  pageSize.value = val
  LoadSimpleSeries()
}

defineExpose({ LoadSimpleSeries })

</script>

<template>
  <div style="width: 2000px; max-width: 95%; background-color: white; line-height: 40px">
    <el-table stripe class="seriesDataColumn" height="628px" style="border: none" :data="simpleSeriesData">
      <el-table-column type="selection" width="50" />
      <el-table-column align="center" v-for="(seriesColumn, key) in seriesColumns" :key="key" :prop="key" :label="seriesColumn" width="180"/>
      <el-table-column fixed="right" align="center" :label="operation.title" width="150">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">{{ operation.detail }}</el-button>
          <el-button link type="primary" size="small">{{ operation.download }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
    />
  </div>

</template>