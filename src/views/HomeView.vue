<script setup lang="ts">
import ShowFile from '@/components/file/ShowFile.vue';
import FileToolMenu from '@/components/file/FileToolMenu.vue';
import { ref } from 'vue';
import { GetAllFileInFileFolder } from '@/api/filefolder/index'
import { DeleteFile } from '@/api/file/index'
import type { GetFilesRes } from '@/api/filefolder/types'
import { useUserStore } from '@/stores/user';
import { ElMessageBox } from 'element-plus';

const FilesInfo = ref<GetFilesRes[]>([])
const user = useUserStore()

// 获得用户信息
const getFilesInfo = async (filefolderId: string) => {
  try {
    const res = await GetAllFileInFileFolder(filefolderId)
    FilesInfo.value = res
  } catch (error) {
    ElMessageBox.alert("网络错误,无法获取用户文件", "ops!")
  }
}

async function deleteFileinFiles(fileId: string) {
  FilesInfo.value = FilesInfo.value.filter((item) => item.file_id !== fileId)
  try {
    const res = await DeleteFile(fileId)
  } catch (error) {
    ElMessageBox.alert("删除失败", "ops!")
  }
}

getFilesInfo(user.filefolder)

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-style">
        <FileToolMenu />
      </el-header>
      <el-main class="main-style">
        <ShowFile :filesInfo="FilesInfo" @removeFileFromFiles="deleteFileinFiles" />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header-style {
  background-color: chartreuse;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  height: 60px;
  width: 100%;
  padding: 0;
}

.main-style {
  background-color: aquamarine;
  position: absolute;
  width: 100%;
  left: 0px;
  height: 100%;
  top: 60px;
  bottom: 0px;
  right: 0px;
  padding: 0px;
}
</style>