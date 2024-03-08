<script setup lang="ts">
import { SearchUser } from '@/api/user';
import type { SearchUserData } from '@/api/user/types';
import { ref } from 'vue';

const userUuid = ref('')
const nickName = ref('')
const status = ref('')
const ParentFunc = defineEmits(['ChangeUserList'])

async function ToSearchUser() {
    const searchData:SearchUserData = {
        uuid: userUuid.value,
        nickname: nickName.value,
        status: status.value,
    }
    try {
        const res = await SearchUser(searchData)
        ParentFunc('ChangeUserList', res)
    } catch(error) {
        console.log(error);
    }
}

const options = [
    {
        value: '',
        label: '任意',
    },
    {
        value: 'inactive',
        label: '封禁',
    },
    {
        value: 'active',
        label: '活跃',
    },
    {
        value: 'common_admin',
        label: '管理',
    },
    {
        value: 'super_admin',
        label: '超管',
    },
]

</script>
<template>
    <el-row :gutter="20">
        <el-col  class="col-style" :span="6"><el-input class="input-style" v-model="userUuid" placeholder="用户uuid" /></el-col>
        <el-col  class="col-style" :span="6"><el-input class="input-style" v-model="nickName" placeholder="用户昵称" /></el-col>
        <el-col  class="col-style" :span="6">
            <el-select
            v-model="status"
            placeholder="用户身份"
            style="width: 240px"
            class="select-style"
            >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
            </el-select>
        </el-col>
      <el-col  class="col-style" :span="6">
        <el-button type="primary" @click="ToSearchUser" class="button-style">
        <el-icon><Search /></el-icon>
            搜索用户
        </el-button>
    </el-col>
    </el-row>
</template>
  
<style scoped>
.input-style {
    position: relative;
    height: 35px;
    top: 8px;
    left: 10px;
    width: 200px;
}

.select-style {
    position: relative;
    height: 35px;
    top: 10px;
    left: 10px;
    width: 200px;
}

.button-style {
    position: relative;
    height: 35px;
    top: 8px;
    left: 10px;
}
.col-style {
    height: 60px;
    padding: 0px;
    display: flex;
}
</style>
  