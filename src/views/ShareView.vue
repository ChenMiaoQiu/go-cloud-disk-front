<script setup lang="ts">
import { GetShareInfo } from '@/api/share';
import type { GetShareRes } from '@/api/share/types';
import SaveFileMenu from '@/components/share/SaveFileMenu.vue';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const user = useUserStore()
const routerShareId = ref('')

const shareInfo = ref<GetShareRes>({
  title: "文件已被删除",
  filename: "来晚了",
  downloadurl: '',
  owner: '',
  shareid: '',
  view: 0,
  sharefileid: '',
  sharetime: '',
  filesize: 0,
})

async function getShareInfo(id:string) {
  try{
    const res = await GetShareInfo({shareid:id})
    shareInfo.value = res
  } catch(error) {
    ElMessage({
      message: '服务器错误,获取失败',
      type: 'warning',
    })
  }
}

function downLoadFile() {
  window.open(shareInfo.value.downloadurl, '_blank')
}

// 展示移动文件界面
const saveFileMenuRef = ref()
function ShowRemoveFileMenu(fileid:string) {
  saveFileMenuRef.value?.ShowSaveFileTable(fileid)
}

function GetShareId(input: string | string[]) {
  if (typeof input === 'string') {
    routerShareId.value = input
  } else if (Array.isArray(input)) {
    routerShareId.value = ''
  }
}

function getFileSize(size: number): string {
    if (size == 0) return "-"
    if (size < 1024) {
        const str = String(size.toFixed(2))
        return str + 'B'
    }
    size /= 1024
    if (size < 1024) {
        const str = String(size.toFixed(2))
        return str + 'KB'
    }
    size /= 1024
    const str = String(size.toFixed(2))
    return str + 'MB'
}

GetShareId(route.params?.shareId)
getShareInfo(routerShareId.value)
</script>

<template>
  <SaveFileMenu ref="saveFileMenuRef"></SaveFileMenu>
  <div class="common-layout">
    <el-container>
      <el-header>{{ shareInfo.title }}</el-header>
      <el-main>
        <div class="hot-style">
          <el-icon><View /></el-icon>
          <el-text class="mx-1" type="danger">热度</el-text>
          {{ shareInfo.view }}
        </div>
        <el-space>
          <el-text class="mx-1" size="large">文件名:</el-text>
          <el-text class="mx-1" size="large" type="primary">{{ shareInfo.filename }}</el-text>
        </el-space>
        <div class="file-size-style">
          <el-text class="mx-1">文件大小:</el-text>
          <el-text class="mx-1" type="primary">{{ getFileSize(shareInfo.filesize) }}</el-text>
        </div>
        <div class="button-style">
          <el-button type="primary" @click="downLoadFile">下载</el-button>
          <el-button type="primary" v-if="user.token !== '' && shareInfo.sharefileid !== ''" @click="ShowRemoveFileMenu(shareInfo.sharefileid)">保存</el-button>
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

.file-size-style{
  position: absolute;
  display: flex;
  height: 10px;
  left: 42%;
}

.button-style{
  position: relative;
}
</style>