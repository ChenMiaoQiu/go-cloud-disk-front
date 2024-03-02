<script lang="ts" setup>
import { ref } from 'vue'
import UploadButton from './UploadButton.vue';
import type { FilesInfo, GetFileFoldersRes } from '@/api/filefolder/types'
import CreateFIleFolderButton from './CreateFIleFolderButton.vue';
import { useUserStore } from '@/stores/user';
const FileFolderId = defineProps(['nowFileFolder'])
const parentFunc = defineEmits(['pushFileFolderToFiles', 'pushFileToFiles', 'returnParentFileFolder'])

const mainFileFolderId = useUserStore().filefolder

function pushFileToFiles(file: FilesInfo) {
    parentFunc('pushFileToFiles', file)
}

function pushFileFolderToFiles(file: GetFileFoldersRes) {
    parentFunc('pushFileFolderToFiles', file)
}

function returnParentFileFolder() {
    parentFunc('returnParentFileFolder')
}

</script>

<template>
    <el-row :gutter="20" class="menu-style">
        <el-col :span="6" class="col-style">
            <UploadButton :FileFolderId="FileFolderId.nowFileFolder" @pushFileToFiles="pushFileToFiles" />
        </el-col>
        <el-col :span="6" class="col-style">
            <div class="grid-content ep-bg-purple" style="position: absolute;">
                <CreateFIleFolderButton :FileFolderId="FileFolderId.nowFileFolder"
                    @pushFileFolderToFiles="pushFileFolderToFiles"></CreateFIleFolderButton>
            </div>
        </el-col>
        <el-col :span="6" class="col-style">
            <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6" class="col-style">
            <el-button v-if="FileFolderId.nowFileFolder !== mainFileFolderId" @click="returnParentFileFolder" type="primary"
                link class="button-style">
                返回上一级
            </el-button>
        </el-col>
    </el-row>
</template>


<style scoped>
.col-style {
    height: 60px;
    padding: 0px;
}

.button-style {
    position: absolute;
    top: 20px;
}
</style>


  