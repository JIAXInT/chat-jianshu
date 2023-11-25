<template>
  <div class="register-container">
    <h2 class="register-title">新用户注册</h2>
    <el-form ref="registerForm" :model="formData" :rules="registerRules" class="register-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="formData.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register(registerForm)">注册</el-button>
        <router-link to="/login">已有账号？去登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref , reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
// import router from '@/router';
import { registerUser } from '@/api/userApi';

import usePageTitle from '@/hooks/usePageTitle';

usePageTitle('注册');

const registerForm = ref()

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
});

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度在5-10个字符之间', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
  ],
};

const register = (formEl) => {
    formEl.validate(async (valid) => {
    if (valid) {
      // 发送注册请求
      await registerUser(formData);

      //跳转到登录页
    //   router.push('/login');
      
    } else {
      console.log('表单校验不通过');
      return false;
    }
  });
};
</script>

<style scoped>.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  
  .register-title {
    margin-bottom: 20px;
  }
  
  .register-form {
    width: 400px;
  }
</style>