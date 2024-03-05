<script lang="ts" setup>
import { CreateShare } from '@/api/share';
import { ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'

const showTable = ref(false)
const shareFileId = ref('')
const formLabelWidth = '140px'

const form = reactive({
  title: '',
})

// 展示分享文件界面
function showShareMenu(fileId:string) {
    showTable.value = true
    shareFileId.value = fileId
}

async function ConfirmCreate() {
    showTable.value = false
    if (form.title === "") {
        ElMessageBox.alert('分享失败,标题不能为空', 'Ops', {
            confirmButtonText: 'OK',
        })
        return
    }

    try {
        const res = await CreateShare({
            fileId: shareFileId.value,
            title: form.title,
        })
        ElMessageBox.alert('分享成功!,这是您的分享号:' + res.shareid, 'Ops', {
            confirmButtonText: 'OK',
        })
    } catch (error) {
        ElMessageBox.alert('抱歉因,服务器波动,分享失败', 'Ops', {
            confirmButtonText: 'OK',
        })
    }
}

defineExpose({ showShareMenu });
</script>

<template>
    <el-dialog v-model="showTable" title="创建分享" width="500">
        <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="showTable = false">取消</el-button>
            <el-button type="primary" @click="ConfirmCreate">
            创建
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>
  

  