<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import type { FilesInfo } from "@/api/file/types";
import { serviceJwt } from '@/api/http';

const FileFolderId = defineProps(['FileFolderId'])
const pushFileToFiles = defineEmits(['pushFileToFiles'])

// 上传文件
const fileUpload = async (param: UploadRequestOptions) => {
    // 获取上传的文件
    const file = param.file
    const formData = new FormData()
    formData.append('file', file)
    formData.append('filefolder', FileFolderId.FileFolderId)

    // 发送url
    try {
        const res = await serviceJwt.post<FilesInfo>('api/v1/file', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(res);
        pushFileToFiles("pushFileToFiles", res)
        ElMessageBox.alert("上传成功", "Tips");
    } catch (error) {
        ElMessageBox.alert("上传失败", "Ops");
    }

}

</script>

<template>
    <div>
        <el-upload class="upload-demo" action="#" :http-request="fileUpload">
            <el-button class="button-style" type="primary">上传文件</el-button>
        </el-upload>
    </div>
</template>

<style scoped>
.button-style {
    position: absolute;
    top: 15px;
    left: 30px;
}
</style>

  