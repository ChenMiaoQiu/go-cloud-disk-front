<script lang="ts" setup>
import { AdminGetFileStoreVolum, UpdateFileStoreVolum } from '@/api/filestore';
import { ChangeUserAuth } from '@/api/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'

const showTable = ref(false)
const changeUserId = ref('')

const form = reactive({
    newAuth: ''
})
const formLabelWidth = '140px'
const userStoreVolum = ref(0)


async function ShowChangeStoreMenu(userId:string) {
    showTable.value = true
    changeUserId.value = userId

    try {
        const res = await AdminGetFileStoreVolum({
            userId: userId
        })
        userStoreVolum.value = res.maxsize
    } catch(error) {
        ElMessageBox.alert("获取失败", "ops")
    }
}

async function ConfirmUpdateVolum() {
    showTable.value = false

    try {
        await UpdateFileStoreVolum({
            userid: changeUserId.value,
            volum: userStoreVolum.value,
        })
        ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
        })
    } catch(error) {
        ElMessage({
            showClose: true,
            message: '修改失败',
            type: 'error',
        })
    }
}

defineExpose({ ShowChangeStoreMenu });
</script>

<template>
    <el-dialog v-model="showTable" :show-close="false" width="500">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">修改用户容量</h4>
            </div>
        </template>
        <el-form :model="form">
            <el-form-item label="用户容量(单位B)" :label-width="formLabelWidth">
                <el-input-number v-model="userStoreVolum" size="large" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showTable = false">取消</el-button>
                <el-button type="primary" @click="ConfirmUpdateVolum">
                确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.dialog-footer{
  position: relative;
  bottom: 0;
  right: 0;
  display: flex;
  height: 50px;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
  
