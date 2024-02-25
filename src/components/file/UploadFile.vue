<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { GetUploadUrl } from '@/api/file/index'

const upload = ref<UploadInstance>()

const uploadFileName = ref('')
const uploadLink = ref('')

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = async () => {
  const res = await GetUploadUrl({
    filetype: uploadFileName.value
  })
  console.log(res)
  uploadLink.value = res.url
  upload.value!.submit()
}

const handleChange: UploadProps['onChange'] = (files) => {
  const extension = files.name.substring(files.name.lastIndexOf('.') + 1);
  uploadFileName.value = extension
}


</script>

<template>
    <el-upload
    class="avatar-uploader"
      method="PUT"
      :action="uploadLink"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :limit="1"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
</template>
  
