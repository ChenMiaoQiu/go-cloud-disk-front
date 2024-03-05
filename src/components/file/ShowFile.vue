<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DownloadFile } from '@/api/file/index'
import RemoveFileMenu from '@/components/file/RemoveFileMenu.vue'
import ShareFileMenu from '@/components/file/ShareFileMenu.vue'
import { useUserStore } from '@/stores/user';

const files = defineProps(['filesInfo', 'nowFileFolder'])
const parentFunc = defineEmits(['updateFileList', 'removeFileFromFiles'])

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

// 跳转到下载页面
async function downLoadFile(fileid: string) {
    const res = await DownloadFile(fileid)
    window.open(res.dowload_url, '_blank')
}

// 获得文件类型
function getFileType(type: string): string {
    if (type === 'file_folder') {
        return 'folder'
    }
    return 'unknow'
}

// 跳转文件夹
function clickThis(filefolderId: string) {
    parentFunc('updateFileList', filefolderId)
}

// 展示移动文件界面
const removeMenuRef = ref()
function showRemoveFileMenu(fileid:string) {
    removeMenuRef.value?.showRemoveTable(fileid)
}

// 展示分享文件界面
const shareMenuRef = ref()
function showShareFileMenu(fileid:string) {
    shareMenuRef.value?.showShareMenu(fileid)
}

function removeSuccess() {
    parentFunc('updateFileList', useUserStore().filefolder)
}

</script>

<template>
    <RemoveFileMenu ref="removeMenuRef" @removeSuccess="removeSuccess"></RemoveFileMenu>
    <ShareFileMenu ref="shareMenuRef"></ShareFileMenu>
    <el-table :data="files.filesInfo" height="500" class="table-style">
        <el-table-column width="100">
            <template #default="scoped">
                <el-icon v-if="getFileType(scoped.row.filetype) === 'folder'">
                    <Folder />
                </el-icon>
                <el-icon v-else>
                    <Document />
                </el-icon>
            </template>
        </el-table-column>
        <!-- 判断是否为文件夹 是则可以点击进入 -->
        <el-table-column prop="filename" label="文件名" width="180">
            <template #default="scoped">
                <div v-if="getFileType(scoped.row.filetype) !== 'folder'">
                    {{ scoped.row.filename }}
                </div>
                <el-button link v-else @click="clickThis(scoped.row.file_id)">
                    {{ scoped.row.filename }}
                </el-button>
            </template>
        </el-table-column>

        <el-table-column prop="filetype" label="文件类型" width="180">
            <template #default="scoped">
                <div v-if="getFileType(scoped.row.filetype) !== 'folder'"> {{ scoped.row.filetype }} </div>
                <div v-else> 文件夹 </div>
            </template>
        </el-table-column>
        <!-- 计算文件大小方便展示 -->
        <el-table-column prop="address" label="文件大小">
            <template #default="scoped">
                {{ getFileSize(scoped.row.size) }}
            </template>
        </el-table-column>

        <!-- 操作判断 -->
        <el-table-column fixed="right" label="操作" width="200">
            <template #default="scoped">
                <div v-if="scoped.row.filetype !== 'file_folder'">
                    <el-button link type="primary" size="small"
                        @click="parentFunc('removeFileFromFiles', scoped.row.file_id)">删除</el-button>
                    <el-button link type="primary" size="small" @click="downLoadFile(scoped.row.file_id)">下载</el-button>
                    <el-button link type="primary" size="small" @click="showRemoveFileMenu(scoped.row.file_id)">
                        移动
                    </el-button>
                    <el-button link type="primary" size="small" class="tooltip" @click="showShareFileMenu(scoped.row.file_id)">
                        <el-icon><Share /></el-icon>
                        <span class="tooltiptext">分享</span>
                    </el-button>
                </div>
                <div v-else>
                    <el-button link type="primary" size="small"
                        @click="parentFunc('removeFileFromFiles', scoped.row.file_id)">删除</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
  


<style scoped>
.table-style {
    width: 100%;
    height: 100%;
}

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 40px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>
  