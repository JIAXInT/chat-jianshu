<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const { userInfo, clearUserInfo } = useUserStore()

const handleCommand = (command) => {
  switch (command) {
    case 'create-blog':
      router.push('/create-edit-blog')
      break
    case 'my-blogs':
      router.push('/my-blogs')
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

const logout = () => {
  // 执行注销逻辑
  clearUserInfo()

  // 清空token
  localStorage.removeItem('token')

  // 跳转到登录页
  router.push('/login')
}
</script>

<template>
  <div>
    <!-- 判断 UserInfo.username 如果有显示 nicknamne ，没有则显示登录链接 -->
    <div class="dropdown" v-if="userInfo.username">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.nicknamne || userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCommand('create-blog')">
              <el-icon><edit /></el-icon>创建博客
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('my-blogs')">
              <el-icon><files /></el-icon>我的博客
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('logout')">
              <el-icon><close /></el-icon>注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <RouterLink v-else to="/login" class="login"> 登录</RouterLink>
  </div>
</template>
