<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps } from 'element-plus'

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
        () => true,
        () => false
    )
}
</script>

<template>
    <div>
        <el-upload class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
            :on-exceed="handleExceed">
            <el-button class="button-style" type="primary">Click to upload</el-button>
        </el-upload>
    </div>
</template>

<style scoped>
.button-style {
    position: absolute;
    top: 0px;
}
</style>

  