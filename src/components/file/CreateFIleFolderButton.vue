<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { CreateFileFolder } from '@/api/filefolder/index'
import { ElMessage } from 'element-plus';
const FileFolderId = defineProps(['FileFolderId'])
const parentFunc = defineEmits(['pushFileFolderToFiles'])
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    name: '',
})
async function confirmClick() {
    dialogFormVisible.value = false
    if (form.name === '') {
        ElMessage({
            message: '创建失败 请输入正确的文件夹名',
            type: 'warning',
        })
        return
    }
    try {
        const res = await CreateFileFolder({
            parent: FileFolderId.FileFolderId,
            name: form.name,
        })
        parentFunc('pushFileFolderToFiles', res)
    } catch (error) {
        ElMessage({
            message: '创建失败 请输入正确的文件夹名',
            type: 'warning',
        })
    }

}
</script>

<template>
    <el-button type="primary" class="upload-button" @click="dialogFormVisible = true">
        创建文件夹
    </el-button>

    <el-dialog v-model="dialogFormVisible" title="创建文件夹" width="500">
        <el-form :model="form">
            <el-form-item label="文件夹名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
.upload-button {
    position: absolute;
    left: 0px;
    top: 15px;
}
</style>
  

  