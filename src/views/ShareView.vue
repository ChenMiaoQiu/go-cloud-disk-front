<script setup lang="ts">
import { GetShareInfo } from '@/api/share';
import type { GetShareRes } from '@/api/share/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const shareId = route.params.shareId
const shareInfo = ref<GetShareRes>({
  title: "文件已被删除",
  filename: "来晚了",
  downloadurl: "",
  owner: "",
  shareid: "",
  view: 0,
  sharefileid: "",
  sharetime: "",
})

async function ShareInfo(id:string) {
  try{
    const res = await GetShareInfo({shareid:id})
    shareInfo.value = res
  } catch(error) {
    console.log(error);
  }
}

function downLoadFile() {
  window.open(shareInfo.value.downloadurl, '_blank')
}

ShareInfo(shareId as string)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>{{ shareInfo?.title }}</el-header>
      <el-main>
        <div class="hot-style">
          <el-icon><View /></el-icon>
          <el-text class="mx-1" type="danger">热度</el-text>
          {{ shareInfo?.view }}
        </div>
        <el-space>
          <el-text class="mx-1" size="large">文件名:</el-text>
          <el-text class="mx-1" size="large" type="primary">{{ shareInfo.filename }}</el-text>
        </el-space>
        <div>
          <el-button type="primary" @click="downLoadFile">下载</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

  
<style scoped>
.incon-style {
  height: 50px;
}

.common-layout {
  width: 100%;
  height: 100%;
}

.hot-style {
  height: 50px;
}

.text-style {
  height: 20px;
}
</style>