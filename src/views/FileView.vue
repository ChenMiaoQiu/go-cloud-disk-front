<script setup lang="ts">
import ShowFile from '@/components/file/ShowFile.vue';
import FileToolMenu from '@/components/file/FileToolMenu.vue';
import { ref, watch } from 'vue';
import { GetAllFileFolderInFileFolder, GetAllFileInFileFolder, DeleteFileFolder } from '@/api/filefolder/index'
import { DeleteFile } from '@/api/file/index'
import type { GetFilesRes, FilesInfo, GetFileFoldersRes } from '@/api/filefolder/types'
import { ConverFilefolderInfoToFileInfo } from '@/api/filefolder/types'
import { useUserStore } from '@/stores/user';
import { ElMessageBox } from 'element-plus';
import router from '@/router';

const FilesInfo = ref<FilesInfo[]>([])
const user = useUserStore()
const nowFileFolder = ref('')
let parentFileFolderId = new Map();
parentFileFolderId.set(useUserStore().filefolder, 'root')

// 获得用户文件
const getFilesInfo = async (filefolderId: string) => {
  try {
    const res = await GetAllFileInFileFolder(filefolderId)
    if (res !== null) {
      for (let i = 0; i < res.length; i++) {
        FilesInfo.value.push(res[i])
      }
    }
  } catch (error) {
    console.log(error);

    ElMessageBox.alert("网络错误,无法获取用户文件", "ops!")
  }
}

// 获得用户文件夹
const getFileFolderInfo = async (filefolderId: string) => {
  try {
    const res = await GetAllFileFolderInFileFolder(filefolderId)
    if (res !== null) {
      for (let i = 0; i < res.length; i++) {
        parentFileFolderId.set(res[i].filefolder_id, filefolderId)
        FilesInfo.value.push(ConverFilefolderInfoToFileInfo(res[i]))
      }
    }
  } catch (error) {
    ElMessageBox.alert("网络错误,无法获取用户文件", "ops!")
  }
}

async function deleteFileinFiles(fileId: string) {
  // 在删除一个用户文件时直接删除用户展示的文件，无需向服务器发布请求重新获取用户展示页面
  let FileType = ''
  for (let i = 0; i < FilesInfo.value.length; i++) {
    if (FilesInfo.value[i].file_id === fileId) {
      FileType = FilesInfo.value[i].filetype
    }
  }
  FilesInfo.value = FilesInfo.value.filter((item) => item.file_id !== fileId)
  try {
    if (FileType === 'file_folder') {
      const res = await DeleteFileFolder(fileId)
    } else {
      const res = await DeleteFile(fileId)
    }
  } catch (error) {
    ElMessageBox.alert("删除失败", "ops!")
  }
}

// 向用户展示列表添加文件
function addMoreFileInFilesList(file: FilesInfo) {
  FilesInfo.value.push(file)
}

// 向用户展示列表添加文件夹
function addMoreFileFolderInFileList(filefolder: GetFileFoldersRes) {
  parentFileFolderId.set(filefolder.filefolder_id, filefolder.parent)
  FilesInfo.value.unshift(ConverFilefolderInfoToFileInfo(filefolder))
}


// 更新用户文件展示列表
async function updateFileList(filefolderId: string) {
  nowFileFolder.value = filefolderId
  FilesInfo.value = []
  await getFileFolderInfo(filefolderId)
  await getFilesInfo(filefolderId)
}

// 回到父文件夹
async function returnParentFileFolder() {
  const parentId: string = parentFileFolderId.get(nowFileFolder.value)
  if (parentId !== '' && parentId !== 'root') {
    updateFileList(parentId)
  }
}

// 如果有filefolderid 则直接获取文件列表，没有则监听直到filefolder 更新
if (user.filefolder != '') {
  updateFileList(user.filefolder)
} else {
  watch(
    () => user.filefolder,
    (newValue, oldValue) => {
      updateFileList(newValue)
    }
  )
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-style">
        <FileToolMenu :nowFileFolder="nowFileFolder" @returnParentFileFolder="returnParentFileFolder"
          @pushFileFolderToFiles="addMoreFileFolderInFileList" @pushFileToFiles="addMoreFileInFilesList" />
      </el-header>
      <el-main class="main-style">
        <ShowFile :filesInfo="FilesInfo" :nowFileFolder="nowFileFolder" @updateFileList="updateFileList"
          @removeFileFromFiles="deleteFileinFiles" />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header-style {
  background-color: white;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  height: 60px;
  width: 100%;
  padding: 0;
  border-bottom: 1px solid var(--el-border-color);
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