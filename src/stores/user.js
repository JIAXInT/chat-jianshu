import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 定义userinfo ，包括 username nikename
  const userInfo = reactive({
    username: '',
    nickname: ''
  })

  //设置用户信息函数
  const setUserInfo = ({ username, nickname }) => {
    userInfo.username = username
    userInfo.nickname = nickname
  }

  // 清空用户信息函数
  const clearUserInfo = () => {
    userInfo.username = ''
    userInfo.nickname = ''
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo
  }
})
