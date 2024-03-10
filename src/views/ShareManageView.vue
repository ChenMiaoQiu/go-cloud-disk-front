<script setup lang="ts">
import type { SearchShareRes } from '@/api/share/types';
import SearchShareTopMenu from '@/components/adminShare/SearchShareTopMenu.vue';
import ShowShareMenu from '@/components/adminShare/ShowShareMenu.vue';
import { ref } from 'vue';

const shareList = ref<SearchShareRes[]>([])

function ChangeShareList(newList:any) {
    shareList.value = newList
}

function DeleteShare(shareId:any) {
  shareId as string
  shareList.value = shareList.value.filter((item) => item.shareid !== shareId)
}

</script>

<template>
    <div class="common-layout">
        <el-container>
        <el-header class="header-style"><SearchShareTopMenu @ChangeShareList="ChangeShareList"/></el-header>
        <el-main class="main-style"><ShowShareMenu @DeleteShare="DeleteShare" :shareList="shareList"/></el-main>
        </el-container>
    </div>
</template>

<style scoped>
.header-style {
  position: absolute;
  height: 60px;
  width: 100%;
  padding: 0;
  border-bottom: 1px solid var(--el-border-color);
}

.main-style {
  background-color: red;
  position: absolute;
  width: 100%;
  height: 500px;
  top: 60px;
  padding: 0px;
}
</style>
