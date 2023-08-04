<script setup lang="ts">

import {onMounted, ref} from "vue";
import {
  getBodyPart,
  getInstitution,
  getModality, getOrgan,
  getScanType
} from "@/api/dimension";
import type {
  BodyPart,
  Institution,
  Organ,
  ScanType
} from '@/api/dimension'
import eventBus from "@/libs/eventBus";

const institution = ref<Array<Institution>>()
const modality = ref<Array<string>>()
const bodyPart = ref<Array<BodyPart>>()
const scanType = ref<Array<ScanType>>()
const organ = ref<Array<Organ>>()
const patientSex = [
  {
    "id": "M",
    "name": "男"
  },{
    "id": "F",
    "name": "女"
  }
]
const selectInstitution = ref([])
const selectModality = ref([])
const selectBodyPart = ref([])
const sliceRange = ref()
const selectPatientSex = ref()
const selectScanType = ref([])
const selectOrgan = ref([])


onMounted(() => {
  LoadInstitution()
  LoadModality()
  LoadBodyPart()
  LoadScanType()
  LoadOrgan()
});

// 加载机构列表
async function LoadInstitution() {
  let {data} = await getInstitution();
  institution.value = data
}

// 加载模态列表
async function LoadModality() {
  let {data} = await getModality();
  modality.value = data
}

// 加载身体检查部位列表
async function LoadBodyPart() {
  let {data} = await getBodyPart();
  bodyPart.value = data.records
}

// 加载扫描类型列表
async function LoadScanType() {
  let {data} = await getScanType();
  scanType.value = data.records
}

// 加载器官列表
async function LoadOrgan() {
  let {data} = await getOrgan();
  organ.value = data.records
}

// 过滤查询
function filter() {

  eventBus.emit('filterCondition', {
    "selectInstitution": selectInstitution,
    "selectModality": selectModality,
    "sliceRange": sliceRange.value,
    "selectBodyPart": selectBodyPart,
    "selectPatientSex": selectPatientSex,
    "selectScanType": selectScanType,
    "selectOrgan": selectOrgan
  })
}

defineExpose({selectInstitution, selectModality})

</script>

<template>
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
    模态：
    <el-select multiple :clearable="true" v-model="selectModality" placeholder="全部">
      <el-option
          v-for="item in modality"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
    切片厚度：
    <el-input v-model="sliceRange" placeholder="示例：0.625（精确过滤），0.625,3（范围过滤）" clearable />
    身体检查部位：
    <el-select multiple :clearable="true" v-model="selectBodyPart" placeholder="全部">
      <el-option
          v-for="item in bodyPart"
          :key="item.id"
          :label="item.bodyName"
          :value="item.id"
      />
    </el-select>
    性别：
    <el-select :clearable="true" v-model="selectPatientSex" placeholder="全部">
      <el-option
          v-for="item in patientSex"
          :key="item.id"
          :label="item.name"
          :value="item.id"
      />
    </el-select>
    扫描类型：
    <el-select multiple :clearable="true" v-model="selectScanType" placeholder="全部">
      <el-option
          v-for="item in scanType"
          :key="item.id"
          :label="item.scanTypeName"
          :value="item.id"
      />
    </el-select>
    器官：
    <el-select multiple :clearable="true" v-model="selectOrgan" placeholder="全部">
      <el-option
          v-for="item in organ"
          :key="item.id"
          :label="item.organName"
          :value="item.id"
      />
    </el-select>
  </div>
  <el-button type="primary" @click="filter">确认</el-button>
</template>

<style scoped lang="less">

</style>