<script lang="ts" setup>
import { ref } from 'vue'
import UploadButton from './UploadButton.vue';

</script>

<template>
    <el-row :gutter="20">
        <el-col :span="6" style="height: 60px; background-color: green;">
            <el-button type="info">Info</el-button>
        </el-col>
        <el-col :span="6" style="height: 60px; background-color: aqua;">
            <div class="grid-content ep-bg-purple" style="position: absolute;">
                <UploadButton></UploadButton>
            </div>
        </el-col>
        <el-col :span="6" style="height: 60px; background-color: green;">
            <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6" style="height: 60px; background-color: green;">
            <div class="grid-content ep-bg-purple" />
        </el-col>
    </el-row>
</template>


<style scoped>
.menu-class {
    background-color: red;
    position: relative;
    height: 100%;
}
</style>
  

  