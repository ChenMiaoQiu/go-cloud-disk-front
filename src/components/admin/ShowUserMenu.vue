<script lang="ts" setup>
import { ref } from 'vue';
import ChangeAuthMenu from './ChangeAuthMenu.vue';

const userList = defineProps(['userList'])

function GetStatusType(type:string): string{
    if (type == "active") {
        return "primary"
    }
    if (type == "common_admin") {
        return "warning"
    }
    if (type == "super_admin") {
        return "danger"
    }
    return "info"
}

function GetStatusName(type:string): string{
    if (type == "active") {
        return "活跃"
    }
    if (type == "common_admin") {
        return "管理"
    }
    if (type == "super_admin") {
        return "超管"
    }
    return "封禁"
}

const changeAuthMenuRef = ref()
function ShowChangeAuthMenu(fileid:string) {
    changeAuthMenuRef.value?.ShowChangeAuthMenu(fileid)
}
</script>

<template>
    <ChangeAuthMenu ref="changeAuthMenuRef"/>
    <el-table :data="userList.userList" class="show-form">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="username" label="username" width="180" />
        <el-table-column prop="nickname" label="nickname" width="180"/>
        <el-table-column>
            <template  #default="scoped">
                <el-button :type="GetStatusType(scoped.row.status)">{{ GetStatusName(scoped.row.status) }}</el-button>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
            <template #default="scoped">
                <el-button link type="primary" size="small" @click="ShowChangeAuthMenu(scoped.row.id)">
                    更改权限
                </el-button>
                <el-button link type="primary" size="small">
                    修改存储容量
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
</style>./ChangeAuthMenu.vue