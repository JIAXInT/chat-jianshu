import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

function useNavToHome() {
  const router = useRouter()
  const { userInfo } = useUserStore()
  // 监听 userInfo.username 如果有值 说明用户已登录 跳转到首页
  watch(
    () => userInfo.username,
    (val) => {
      if (val) {
        router.push('/home')
      }
    },
    {
      immediate: true
    }
  )
}

export default useNavToHome
