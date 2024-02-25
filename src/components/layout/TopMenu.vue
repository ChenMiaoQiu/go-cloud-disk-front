<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';
const user = useUserStore()
user.getUserInfo()
const userName = ref(user.nickname)

// 监听是否成功获取到信息
watch(
  () => user.nickname,
  (newValue, oldValue) => {  
    userName.value = newValue;  
  }  
)

</script>

<template>
  <div class="header">
    <el-menu class="el-menu-demo" mode="horizontal">
      <RouterLink to="/">
        <el-menu-item index="1">
          主页 
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/login">
        <el-menu-item index="2">
          登录 
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/register">
        <el-menu-item index="3">
          注册 
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/info">
        <el-menu-item index="4">
          Info 
        </el-menu-item>
      </RouterLink>
      <el-menu-item v-if="userName === ''" index="10">未登录</el-menu-item>
      <el-menu-item v-else index="10">{{ userName }}</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
