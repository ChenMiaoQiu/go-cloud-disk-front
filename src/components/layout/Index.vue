<script setup lang="ts">
import LeftMenu from './LeftMenu.vue';
import TopMenu from './TopMenu.vue';


</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" class="el-aside">
                <LeftMenu />
            </el-aside>
            <el-container class="el-container">
                <el-header class="el-header">
                    <TopMenu />
                </el-header>
                <el-main class="el-main">
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<style scoped>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #b3c0d1;
    text-align: center;
    line-height: 60px;
    right: 0px;
    left: 200px;
    margin: 0;
    position: fixed;
    padding: 0;
}

.el-aside {
    background-color: white;
    text-align: center;
    line-height: 200px;
    height: 100%;
    border-right: 1px solid var(--el-border-color);

    position: fixed;
}

.el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
    position: fixed;
    display: flex;
    left: 200px;
    top: 60px;
    right: 0px;
    height: 100%;
    padding: 0;
}

.el-menu {
    background-color: white;
}
</style>