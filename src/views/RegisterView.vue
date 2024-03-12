<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { GetConfirmEmail, LoginUser, RegisterUser } from '../api/user/index'
import router from '@/router'


// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
  nickname: '',
  checkPass: '',
  code: '',
})

const isLoding = ref(false)


function checkVaild(): boolean {
  if (form.password === '' ||  form.checkPass === '') {
    ElMessageBox.alert('密码不能为空', 'ops')
    return false
  }

  if (form.nickname === '') {
    ElMessageBox.alert('昵称不能为空', 'ops')
    return false
  }

  if (form.password != form.checkPass) {
    ElMessageBox.alert('两次输入的密码不一致', 'ops')
    return false
  }

  if (!emailRegex.test(form.username)) {
    ElMessageBox.alert('邮箱格式错误', 'ops')
    return false
  }

  if (form.code === '') {
    ElMessageBox.alert('邮箱验证码不能为空', 'ops')
    return false
  }

  return true
}
const onSubmit = async () => {
  if (!checkVaild()) {
    return
  }

  isLoding.value = true
  try {
    const res = await RegisterUser(form)
    useUserStore().setToken(res.token)
    useUserStore().setUser(res)
  } catch (error) {
    ElMessageBox.alert(error as string, 'ops')
    isLoding.value = false
    return
  }
  router.push('/').then(() => {
    location.reload()
  })
  isLoding.value = false
}

const Sleep = (ms:number)=> {
  return new Promise(resolve=>setTimeout(resolve, ms))
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const waitingCode = ref(false)
const getCodeText = ref('获取验证码')
async function GetEmailCode() {
  waitingCode.value = true
  if (!emailRegex.test(form.username)) {
    ElMessageBox.alert("请输入正确的邮箱","ops")
    waitingCode.value = false
    return
  }
  
  try {
    await GetConfirmEmail({
      email: form.username
    })
  }catch(error) {
    ElMessageBox.alert("网络错误,获取失败!","ops")
    waitingCode.value = false
    return
  }

  for (let i = 180; i >= 0; i --) {
    getCodeText.value = `${i}秒 后可重新获取`
    await Sleep(1000)
  }
  getCodeText.value = '重新获取'
  waitingCode.value = false
}

</script>

<template>
  <el-form class="login-style" :model="form" label-width="120px">
    <!-- 邮箱 -->
    <el-form-item
      prop="email"
      label="Email"
    >
      <el-input v-model="form.username" />
    </el-form-item>
    <!-- 邮箱验证码 -->
    <el-form-item label="Email Code">
      <el-input v-model="form.code" />
    </el-form-item>
    <el-form-item>
      <el-button 
        type="primary"
        :loading="waitingCode"
        :disabled="waitingCode"
        @click="GetEmailCode"
      >
        {{ getCodeText }}
      </el-button>
    </el-form-item>
    <!-- 用户昵称 -->
    <el-form-item label="NickName">
      <el-input v-model="form.nickname" />
    </el-form-item>

    <el-form-item label="PassWord">
      <el-input
        v-model="form.password"
        type="password"
        show-password
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item label="ConfirmPassword">
      <el-input
        v-model="form.checkPass"
        type="password"
        show-password
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="isLoding" @click="onSubmit">注册</el-button>
      <RouterLink to="/login"><el-button>已有账号?去登录</el-button></RouterLink>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.login-style {
  position: relative;
  top: 25%;
  left: 30%;
  height: 500px;
}
</style>

  