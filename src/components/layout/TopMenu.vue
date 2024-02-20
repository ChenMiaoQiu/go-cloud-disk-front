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
    </el-menu>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
