<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import router from '@/router';
import { useRouter } from 'vue-router';
const user = useUserStore()
user.getUserInfo()
const userName = ref(user.nickname)
const route = useRouter()

// 监听是否成功获取到信息
watch(
  () => user.nickname,
  (newValue, oldValue) => {
    userName.value = newValue;
  }
)

function toLoginView() {
  route.push("/login")
}

const configLogout = () => {
  ElMessageBox.alert("即将退出登录", "Tips", {
    confirmButtonText: 'OK',
    callback: () => {
      router.push('login')
      user.logoutUser()
    }
  })
}

</script>

<template>
  <div class="header">
    <el-menu class="el-menu-demo" :ellipsis="false" mode="horizontal">
      <div class="flex-grow" />
      <el-menu-item v-if="userName !== ''" @click="configLogout">退出登录</el-menu-item>
      <el-menu-item v-if="userName === ''" index="1" @click="toLoginView">
        未登录
      </el-menu-item>
      <el-menu-item v-else index="2">{{ userName }}</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  left: 0;
  right: 0;
  margin: 0px;
}

.flex-grow {
  flex-grow: 1;
}
</style>
