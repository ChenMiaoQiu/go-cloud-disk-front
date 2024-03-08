<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const user = useUserStore()
const userUsed = ref<number>(0)
const route = useRouter()

function toHomeView() {
    route.push("/")
}

function toFileView() {
    route.push("/file")
}

function toShareView() {
    route.push("/allshare")
}

function toRankView() {
    route.push("/rank")
}

function toManageUserView() {
    route.push("/manage/user")
}

function toManageShareView() {
    route.push("/manage/share")
}

watch(
    () => user.currentSize,
    (nowVal, oldVal) => {
        const num = user.currentSize / user.maxSize * 100
        userUsed.value = Number(num.toFixed(2))
        console.log(userUsed.value);
        
    }
)
</script>
  
<template>
    <el-row class="tac left-board">
        <el-col>
            <el-menu default-active="2" class="el-menu-vertical-demo left-board-el-menu">
                <el-menu-item index="home" @click="toHomeView">
                    <el-icon><House /></el-icon>
                    <span>主页</span>
                </el-menu-item>
                <el-menu-item index="file" @click="toFileView">
                    <el-icon><Files /></el-icon>
                    <span>所有文件</span>
                </el-menu-item>
                <el-menu-item index="share" @click="toShareView">
                    <el-icon><List /></el-icon>
                    <span>我的分享</span>
                </el-menu-item>
                <el-menu-item index="rank" @click="toRankView">
                    <el-icon><Histogram /></el-icon>
                    <span>分享排行榜</span>
                </el-menu-item>
                <el-menu-item v-if="user.status === 'common_admin' || user.status === 'super_admin'" index="userManage" @click="toManageUserView">
                    <el-icon><Histogram /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>
                <el-menu-item v-if="user.status === 'common_admin' || user.status === 'super_admin'" index="shareManage" @click="toManageShareView">
                    <el-icon><Histogram /></el-icon>
                    <span>分享管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col>
            <el-progress class="used-board" type="circle" :percentage="userUsed" />
            <div class="used-text">已使用</div>
        </el-col>
    </el-row>
</template>
  
<style scoped>
.left-board {
    position: relative;
    bottom: 0px;
    top: 0px;
    height: 500px;
    background-color: white;
    border-right: 1px solid var(--el-border-color);
}

.left-board-el-menu {
    position: relative;
    height: 100%;
}

.used-board {
    top: 180px;
    position: relative;
}

.used-text {
    height: 30px;
    position: relative;
}
</style>