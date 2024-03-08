<script lang="ts" setup>
import {  GetRankInfo } from '@/api/share';
import type { GetAllShareRes } from '@/api/share/types';
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const shares = ref<GetAllShareRes[]>([])
const route = useRouter()
// 获取用户全部分享
async function GetShareRank() {
    try {
        const res = await GetRankInfo({})
        shares.value = res
    } catch(error) {
        ElMessageBox.alert("获取分享失败", "ops")
    }
}

function ToShareLink(shareid:string) {
    route.push("share/" + shareid)
}

GetShareRank()
</script>

<template>
    <el-table class="table-style" :data="shares">
        <el-table-column prop="title" label="Title" width="180" >
            <template #default="scoped">
                <el-button v-if="scoped.row.title != '虚位以待'" link @click="ToShareLink(scoped.row.shareid)">
                    {{ scoped.row.title }}
                </el-button>
                <div v-else>
                    {{ scoped.row.title }}
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="filename" label="文件名" width="180" />
        <el-table-column prop="shareid" label="分享号" width="250"/>
        <el-table-column prop="view" label="点击数" />
    </el-table>
</template>
  
<style scoped>
.table-style {
    width: 100%;
    height: 100%;
}

</style>
  