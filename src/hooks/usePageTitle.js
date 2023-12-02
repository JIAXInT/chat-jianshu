import { isRef, onMounted, onBeforeUnmount, ref, watchEffect } from 'vue'

const name = 'techBlog'

// 定义修改网页标题的函数
function usePageTitle(title) {
  const originTitle = ref(document.title)

  // 更新网页标题
  const updatePageTitle = () => {
    const titleValue = isRef(title) ? title.value : title
    if (!titleValue) {
      return
    }
    document.title = titleValue + '-' + name
  }

  if (isRef(title)) {
    watchEffect(updatePageTitle())
  }

  // 在组件挂载时设置网页标题
  onMounted(() => {
    updatePageTitle()
  })

  // 在组件卸载前恢复原始网页标题
  onBeforeUnmount(() => {
    document.title = originTitle.value
  })
}

export default usePageTitle
