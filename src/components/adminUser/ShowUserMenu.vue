<script lang="ts" setup>
import { ref } from 'vue';
import ChangeAuthMenu from './ChangeAuthMenu.vue';
import ChangeStoreMenu from './ChangeStoreMenu.vue';

const userList = defineProps(['userList'])
const ParentFunc = defineEmits(['ChangeUserStatus'])

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

function ChangeUserStatus(data:any) {
    ParentFunc('ChangeUserStatus', data)
}

const changeAuthMenuRef = ref()
function ShowChangeAuthMenu(userid:string) {
    changeAuthMenuRef.value?.ShowChangeAuthMenu(userid)
}

const changeStoreMenuRef = ref()
function ShowChangeStoreMenu(userId:string) {
    changeStoreMenuRef.value?.ShowChangeStoreMenu(userId)
}
</script>

<template>
    <ChangeStoreMenu ref="changeStoreMenuRef"/> 
    <ChangeAuthMenu @ChangeUserStatus="ChangeUserStatus" ref="changeAuthMenuRef"/>
    <el-table :data="userList.userList" class="show-form">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="username" label="username" width="180" />
        <el-table-column prop="nickname" label="nickname" width="180"/>
        <el-table-column label="身份">
            <template  #default="scoped">
                <el-button :type="GetStatusType(scoped.row.status)">{{ GetStatusName(scoped.row.status) }}</el-button>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
            <template #default="scoped">
                <el-button link type="primary" size="small" @click="ShowChangeAuthMenu(scoped.row.id)">
                    更改权限
                </el-button>
                <el-button link type="primary" size="small" @click="ShowChangeStoreMenu(scoped.row.id)">
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