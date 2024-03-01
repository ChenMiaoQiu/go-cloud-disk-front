<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
  
<template>
    <el-row class="tac left-board">
        <el-col>
            <el-menu default-active="2" class="el-menu-vertical-demo left-board-el-menu" @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                    <el-icon>
                        <Files />
                    </el-icon>
                    <span>所有文件</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
  
<style scoped>
.left-board {
    position: relative;
    bottom: 0px;
    top: 0px;
    height: 100%;
    background-color: rgb(208, 223, 230);
}

.left-board-el-menu {
    position: relative;
    height: 100%;
}
</style>