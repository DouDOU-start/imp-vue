<script setup lang="ts">

import {onBeforeUnmount, ref} from "vue";
import eventBus from "@/libs/eventBus";

export interface TaskItem {
  "href": string,
  "download": string,
  "progress": number
}

const taskMap = ref(new Map<string, TaskItem>())

function updateTask(task: any) {
  taskMap.value.set(task[0], task[1])
}

eventBus.on('updateTask', updateTask)

onBeforeUnmount(() => {
  eventBus.off('updateTask', updateTask)
})

</script>

<template>
  任务下载进度
  <div class="task-list">
    <div v-if="taskMap.size !== 0">
      <div  class="progress" v-for="[key] in taskMap" :key="key">
        <el-text id="id" type="info">{{ key }}：</el-text>
        <el-progress class="progress-item" v-if="taskMap.get(key)?.progress == 100" :percentage="taskMap.get(key)?.progress" status="success"/>
        <el-progress class="progress-item" v-else :percentage="taskMap.get(key)?.progress"/>
        <el-link class="link" v-if="taskMap.get(key)?.href" :href="taskMap.get(key)?.href" :download="taskMap.get(key)?.download">打开</el-link>
      </div>
    </div>
    <el-empty v-else description="暂无下载任务" :image-size="40" />
  </div>
</template>

<style lang="less">
.task-list {

  width: 400px;
  height: 150px;
  background-color: #fcf3f3;
  border: 2px solid #fad5d5;
  border-radius: 5px;
  padding: 10px;
  overflow: scroll;

  .progress {

    display: block;
    overflow: hidden;
    margin: 4px 0;

    #id {
      float: left;
    }

    .progress-item {
      width: 280px;
      float: left;
      top: 4px;
    }

    .link {
      bottom: 2px;
      font-size: 13px;
    }

  }
}

</style>