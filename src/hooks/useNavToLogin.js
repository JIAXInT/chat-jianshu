import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

function useNavToLogin() {
  const router = useRouter()
  const { userInfo } = useUserStore()
  // 监听 userInfo.username 如果有没有值 说明用户未登录 跳转到登录页
  watch(
    () => userInfo.username,
    (val) => {
      if (!val) {
        router.push('/login')
      }
    },
    {
      immediate: true
    }
  )
}

export default useNavToLogin
