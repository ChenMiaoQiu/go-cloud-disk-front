<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue'
import type { FilesInfo, GetFileFoldersRes } from '@/api/filefolder/types'
import { GetAllFileFolderInFileFolder, GetAllFileInFileFolder } from '@/api/filefolder/index'
import { RemoveFile } from '@/api/file/index'
import { ElMessageBox } from 'element-plus';
import { ConverFilefolderInfoToFileInfo } from '@/api/filefolder/types'

const parentFunc = defineEmits(['removeSuccess'])
const user = useUserStore()
const showTable = ref(false)
const removeFileId = ref('')
const nowFileFolder = ref('')
const filefolderList = ref<FilesInfo[]>([])
let parentFileFolderId = new Map();
parentFileFolderId.set(useUserStore().filefolder, 'root')

// 展示移动文件界面
function showRemoveTable(fileId:string) {
    showTable.value = true
    removeFileId.value = fileId
    nowFileFolder.value = user.filefolder
    updateFileList(user.filefolder)
}

// 更新文件列表
async function updateFileList(filefolderId: string) {
  nowFileFolder.value = filefolderId
  filefolderList.value = []
  await getFileFolderInfo(filefolderId)
}

// 获取文件列表
async function getFileFolderInfo(filefolderId: string) {
  try {
    const res = await GetAllFileFolderInFileFolder(filefolderId)
    if (res !== null) {
      for (let i = 0; i < res.length; i++) {
        parentFileFolderId.set(res[i].filefolder_id, filefolderId)
        filefolderList.value.push(ConverFilefolderInfoToFileInfo(res[i]))
      }
    }
  } catch (error) {
    ElMessageBox.alert("网络错误,无法获取用户文件", "ops!")
  }
}

// 计算文件大小
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

// 回到父文件夹
async function returnParentFileFolder() {
  const parentId: string = parentFileFolderId.get(nowFileFolder.value)
  if (parentId !== '' && parentId !== 'root') {
    updateFileList(parentId)
  }
}

// 确定移动
async function confirmRemove() {
  showTable.value = false
  try {
    const res = await RemoveFile({
      name: "",
      file: removeFileId.value,
      parent: nowFileFolder.value
    })
    parentFunc('removeSuccess')
  } catch(error) {
    ElMessageBox.alert("移动失败", "ops")
  }
}

defineExpose({ showRemoveTable });
</script>


<template>
    <el-dialog v-model="showTable" width="800">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">选择想要移动到的文件夹</h4>
          <el-button link type="primary" @click="returnParentFileFolder">
            <el-icon class="el-icon--left"><ArrowLeft /></el-icon>
            返回上一级
          </el-button>
        </div>
      </template>
      <el-table :data="filefolderList">
        <el-table-column prop="filename" label="文件名" width="180">
            <template #default="scoped">
                <el-button link @click="updateFileList(scoped.row.file_id)">
                    {{ scoped.row.filename }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="address" label="文件大小">
            <template #default="scoped">
                {{ getFileSize(scoped.row.size) }}
            </template>
        </el-table-column>
      </el-table>
      <template #footer>
      <div class="dialog-footer">
        <el-button class="dialog-footer-button" @click="showTable = false">取消</el-button>
        <el-button class="dialog-footer-button" type="primary" @click="confirmRemove">
          确定
        </el-button>
      </div>
    </template>
    </el-dialog>
</template>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.dialog-footer{
  position: relative;
  bottom: 0;
  right: 0;
  display: flex;
  height: 100px;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100px;
}

.dialog-footer-button{
  margin-left: 10px;
}
</style>