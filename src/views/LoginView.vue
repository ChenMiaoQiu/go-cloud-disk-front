<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { LoginUser } from '../api/user/index'
import router from '@/router'


// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

const isLoding = ref(false)

const onSubmit = async () => {
  if (form.username === "" || form.password === "") {
    ElMessageBox.alert('请输入正确密码和账户', '错误!')
    return
  }
  isLoding.value = true
  try {
    const res = await LoginUser(form)
    useUserStore().setToken(res.token)
    useUserStore().setUser(res)
  } catch (error) {
    ElMessageBox.alert('请输入正确密码和账户', '错误!')
    isLoding.value = false
    return
  }
  router.push('/').then(() => {
    location.reload()
  })
  isLoding.value = false
}

</script>

<template>
  <el-form class="login-style" :model="form" label-width="120px">
    <el-form-item label="UserName">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" show-password v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="isLoding" @click="onSubmit">登录</el-button>
      <RouterLink to="register"><el-button>注册</el-button></RouterLink>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.login-style {
  position: relative;
  top: 30%;
  left: 30%;
  height: 500px;
}
</style>

  