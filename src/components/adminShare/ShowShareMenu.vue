<script lang="ts" setup>
import { AdminDeleteFile } from '@/api/file';
import { AdminDeleteShare } from '@/api/share';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const shareList = defineProps(['shareList'])
const ParentFunc = defineEmits(['DeleteShare'])
const route = useRouter()


async function DeleteShare(shareId:string) {
    try {
        await AdminDeleteShare({shareid:shareId})
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        })
        ParentFunc('DeleteShare', shareId)
    } catch(error) {
        ElMessage({
            showClose: true,
            message: '删除失败',
            type: 'error',
        })
    }
}

async function DeleteShareAndFile(shareId:string, fileId:string) {
    try {
        await AdminDeleteShare({shareid:shareId})
        await AdminDeleteFile({fileId:fileId})
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        })
        ParentFunc('DeleteShare', shareId)
    } catch(error) {
        ElMessage({
            showClose: true,
            message: '删除失败',
            type: 'error',
        })
    }
}

function ToShareLink(shareid:string) {
    route.push("/share/" + shareid)
}

</script>

<template>
    <el-table :data="shareList.shareList" class="show-form">
        <el-table-column prop="shareid" label="shareid" width="180" >
            <template #default="scoped">
                <el-button link @click="ToShareLink(scoped.row.shareid)">
                    {{ scoped.row.shareid }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="owner" label="owner" width="180" />
        <el-table-column prop="title" label="title"/>
        <el-table-column fixed="right" label="操作" width="200">
            <template #default="scoped">
                <el-button link type="primary" size="small" @click="DeleteShare(scoped.row.shareid)">
                    删除
                </el-button>
                <el-button link type="primary" size="small" @click="DeleteShareAndFile(scoped.row.shareid, scoped.row.sharefileid)">
                    删除并删除分享文件
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>
.show-form {
    height: 100%;
    width: 100%
}
</style>