<script lang="ts" setup>
import { ChangeUserAuth } from '@/api/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'

const showTable = ref(false)
const changeUserId = ref('')

const form = reactive({
    newAuth: ''
})
const formLabelWidth = '140px'

const options = [
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

function ShowChangeAuthMenu(userId:string) {
    showTable.value = true
    changeUserId.value = userId
}

async function ConfrimChange() {
    showTable.value = false
    if (form.newAuth === "") {
        ElMessageBox.alert("不能选择空的状态", "ops")
        return
    }
    try {
        await ChangeUserAuth({
            userid: changeUserId.value,
            status: form.newAuth
        })
    } catch(error) {
        console.log(error);
        
        ElMessageBox.alert("没有权限,修改失败", "ops")
    }
}

defineExpose({ ShowChangeAuthMenu });
</script>

<template>
    <el-dialog v-model="showTable" :show-close="false" width="500">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">修改用户权限</h4>
            </div>
        </template>
        <el-form :model="form">
            <el-form-item label="用户新身份" :label-width="formLabelWidth">
                <el-select
                    v-model="form.newAuth"
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
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showTable = false">取消</el-button>
                <el-button type="primary" @click="ConfrimChange">
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
  
