<script lang="ts" setup>
import { DeleteShareInfo, GetAllShareInfo } from '@/api/share';
import type { GetAllShareRes } from '@/api/share/types';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const shares = ref<GetAllShareRes[]>([])
const route = useRouter()
// 获取用户全部分享
async function GetUserAllShare() {
    try {
        const res = await GetAllShareInfo({})
        shares.value = res
    } catch(error) {
        ElMessageBox.alert("获取分享失败", "ops")
    }
}

// 删除用户分享
async function DeleteUserShare(shareid:string) {
    shares.value = shares.value.filter((item) => item.shareid !== shareid)
    try {
        await DeleteShareInfo({shareid:shareid})
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
    } catch(error) {
        ElMessageBox.alert("删除失败", "ops")
    }
}

// 复制分享链接
async function CopyShareLink(shareid:string) {
    const link:string = import.meta.env.VITE_FRONT_URL + "/share/" + shareid
    const source = ref(link)
    const { copy } = useClipboard({ source })
    copy()
    ElMessage({
        message: '复制成功',
        type: 'success',
    })
}

function ToShareLink(shareid:string) {
    route.push("share/" + shareid)
}

GetUserAllShare()
</script>

<template>
    <el-table class="table-style" :data="shares">
        <el-table-column prop="title" label="Title" width="180" >
            <template #default="scoped">
                <el-button link @click="ToShareLink(scoped.row.shareid)">
                    {{ scoped.row.title }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="filename" label="文件名" width="180" />
        <el-table-column prop="shareid" label="分享号" width="250"/>
        <el-table-column prop="view" label="点击数" />
        <el-table-column fixed="right" label="操作" width="200">
            <template #default="scoped">
                <el-button link type="primary" size="small" @click="CopyShareLink(scoped.row.shareid)">
                    复制链接
                </el-button>
                <el-button link type="primary" size="small" @click="DeleteUserShare(scoped.row.shareid)">
                    删除
                </el-button>
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
  