<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { LoginUser } from '../api/user/index'


// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

const open = () => {
  ElMessageBox.alert('请输入正确密码和账户', '错误!')
}

const onSubmit = async () => {
  if (form.username === "" || form.password === "") {
    open()
    return
  }
  const res = await LoginUser(form)
  console.log(res.username);
  useUserStore().setToken(res.token)
}

const testSubmit = () => {
    useUserStore().getUserInfo()
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
  

  