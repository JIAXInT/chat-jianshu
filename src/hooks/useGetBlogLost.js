import { ref, watchEffect } from 'vue'
import { getBlogList } from '@/api/blogApi'
import { useRoute } from 'vue-router'
function useGetBlogList(opt = {}) {
  const { my = false } = opt
  const $route = useRoute()

  // 定义 list total
  const list = ref([])
  const total = ref(0)

  const currentPage = ref(1)
  const pageSizeRef = ref(10)

  const getBlogListFn = async () => {
    currentPage.value = +$route.query.page || 1
    pageSizeRef.value = +$route.query.pageSize || 10

    const queryInfo = {
      page: +$route.query.page || 1,
      pageSize: +$route.query.pageSize || 10,
      category: $route.query.category,
      keyword: $route.query.keyword,
      my //标记是否是我的
    }
    const { list: blogList, total: blogTotal } = await getBlogList(queryInfo)
    console.log(blogList, blogTotal)
    list.value = blogList
    total.value = blogTotal
  }

  // 使用watchEffect 监听url 参数 page pageSize category keyword 的变化，并获取博客列表和总数
  watchEffect(getBlogListFn)

  return {
    list,
    total,
    currentPage,
    pageSizeRef,
    getBlogListFn
  }
}

export default useGetBlogList
