<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { Action } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useUserStore } from '@/stores/user';

const token = ref('')

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

const open = () => {
  ElMessageBox.alert('请输入正确密码和账户', '错误!')
}

const onSubmit = () => {
  if (form.username === "" || form.password === "") {
    open()
    return
  }
  axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/login", {
    "user_name": form.username,
    "password": form.password
  })
  .then(function (response) {
    const token = response.data.data.token
    useUserStore().setToken(token)
    console.log(useUserStore().userToken);
  })
}

const testSubmit = () => {
    useUserStore().getUserInfo()
    console.log(useUserStore().$state.userInfo);
}

const getTokenVal = () => {
  console.log(useUserStore().userToken);
}

const logout = () => {
  useUserStore().logoutUser()
}

</script>

<template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="UserName">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="testSubmit">测试</el-button>
        <el-button @click="getTokenVal">check</el-button>
        <el-button @click="logout">退出</el-button>
        <RouterLink to="register"><el-button>注册</el-button></RouterLink>
      </el-form-item>
    </el-form>
</template>
  

  