<script setup lang="ts">
import { SearchShare } from '@/api/share';
import type { SearchShareData } from '@/api/share/types';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const userUuid = ref('')
const title = ref('')
const owner = ref('')
const ParentFunc = defineEmits(['ChangeShareList'])

async function ToSearchShare() {
    const searchData:SearchShareData = {
        uuid: userUuid.value,
        title: title.value,
        owner: owner.value,
    }
    try {
        const res = await SearchShare(searchData)
        ParentFunc('ChangeShareList', res)
    } catch(error) {
        ElMessage({
            message: error as string,
            type: 'warning',
        })
    }
}

</script>
<template>
    <el-row :gutter="20">
        <el-col  class="col-style" :span="6"><el-input class="input-style" v-model="userUuid" placeholder="分享uuid" /></el-col>
        <el-col  class="col-style" :span="6"><el-input class="input-style" v-model="title" placeholder="标题" /></el-col>
        <el-col  class="col-style" :span="6"><el-input class="input-style" v-model="owner" placeholder="拥有者" /></el-col>
      <el-col  class="col-style" :span="6">
        <el-button type="primary" @click="ToSearchShare" class="button-style">
        <el-icon><Search /></el-icon>
            搜索分享
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
  