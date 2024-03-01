<script lang="ts" setup>
import { reactive } from 'vue';
import { DownloadFile } from '@/api/file/index'

const files = defineProps(['filesInfo'])
function getFileSize(size: number): string {
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

</script>

<template>
    <el-table :data="files.filesInfo" height="800" class="table-style">
        <el-table-column width="100">
            <template #default="scoped">
            </template>
        </el-table-column>
        <el-table-column prop="filename" label="文件名" width="180" />
        <el-table-column prop="filetype" label="文件类型" width="180" />
        <el-table-column prop="address" label="文件大小">
            <template #default="scoped">
                {{ getFileSize(scoped.row.size) }}
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
            <template #default="scoped">
                <el-button link type="primary" size="small"
                    @click="$emit('removeFileFromFiles', scoped.row.file_id)">删除</el-button>
                <el-button link type="primary" size="small" @click="downLoadFile(scoped.row.file_id)">下载</el-button>
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
  