vue
<template>
  <div class="login-container">
    <h2 class="login-title">用户登录</h2>
    <el-form ref="loginFrom" :model="formData" :rules="loginRules" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(loginFrom)">登录</el-button>
        &nbsp;&nbsp;
        <router-link to="/register">注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import usePageTitle from '@/hooks/usePageTitle'
import { loginUser } from '@/api/userApi'
import useNavToHome from '@/hooks/useNavToHome'

const router = useRouter()

useNavToHome() //如果用户已经登陆 则跳转到首页

usePageTitle('登录')

const loginFrom = ref()

const formData = reactive({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^\w+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度在5-10个字符之间', trigger: 'blur' }
  ]
}

const login = (formEl) => {
  formEl.validate(async (valid) => {
    if (valid) {
      // 执行登录逻辑
      const { token } = await loginUser(formData)
      // 保存token
      localStorage.setItem('token', token)

      // 跳转到首页
      router.push('/home')
    } else {
      console.log('表单校验失败')
      return false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  width: 300px;
}
</style>
