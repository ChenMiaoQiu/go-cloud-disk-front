<script lang="ts" setup>
import { reactive } from 'vue';
import { DownloadFile } from '@/api/file/index'

const files = defineProps(['filesInfo'])
const parentFunc = defineEmits(['updateFileList', 'removeFileFromFiles'])

// 计算文件大小
function getFileSize(size: number): string {
    if (size == 0) return "-"
    if (size < 1024) {
        const str = String(size)
        return str + 'B'
    }
    size /= 1024
    if (size < 1024) {
        const str = String(size)
        return str + 'KB'
    }
    size /= 1024
    const str = String(size)
    return str + 'MB'
}

async function downLoadFile(fileid: string) {
    const res = await DownloadFile(fileid)
    window.open(res.dowload_url, '_blank')
}

function getFileType(type: string): string {
    if (type === 'file_folder') {
        return 'folder'
    }
    return 'unknow'
}

function clickThis(filefolderId: string) {
    parentFunc('updateFileList', filefolderId)
}

</script>

<template>
    <el-table :data="files.filesInfo" height="800" class="table-style">
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
        <el-table-column fixed="right" label="操作" width="150">
            <template #default="scoped">
                <div v-if="scoped.row.filetype !== 'file_folder'">
                    <el-button link type="primary" size="small"
                        @click="parentFunc('removeFileFromFiles', scoped.row.file_id)">删除</el-button>
                    <el-button link type="primary" size="small" @click="downLoadFile(scoped.row.file_id)">下载</el-button>
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
</style>
  