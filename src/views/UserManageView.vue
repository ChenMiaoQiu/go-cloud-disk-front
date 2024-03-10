<script setup lang="ts">
import type { SearchUserRes } from '@/api/user/types';
import SearchUserTopMenu from '@/components/adminUser/SearchUserTopMenu.vue';
import ShowUserMenu from '@/components/adminUser/ShowUserMenu.vue';
import { ref } from 'vue';

const userList = ref<SearchUserRes[]>([])

function ChangeUserList(newList:any) {
    userList.value = newList
}

interface ChangUserStatusData {
  userId:string
  newStatus:string
}
function ChangeUserStatus(data:any) {
    data as ChangUserStatusData
    for (let i = 0; i < userList.value.length; i ++) {
        if (userList.value[i].id === data.userId) {
        userList.value[i].status = data.newStatus
        break
        }
    }
}

</script>

<template>
    <div class="common-layout">
        <el-container>
        <el-header class="header-style"><SearchUserTopMenu @ChangeUserList="ChangeUserList"/></el-header>
        <el-main class="main-style"><ShowUserMenu @ChangeUserStatus="ChangeUserStatus" :userList="userList"/></el-main>
        </el-container>
    </div>
</template>

<style scoped>
.header-style {
  position: absolute;
  height: 60px;
  width: 100%;
  padding: 0;
  border-bottom: 1px solid var(--el-border-color);
}

.main-style {
  background-color: red;
  position: absolute;
  width: 100%;
  height: 500px;
  top: 60px;
  padding: 0px;
}
</style>
