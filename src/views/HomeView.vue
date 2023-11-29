<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePageTitle from '@/hooks/usePageTitle'
import { getBlogList } from '@/api/blogApi'
import BlogCard from '../components/BlogCard.vue'

usePageTitle('首页')

const $route = useRoute()
const $router = useRouter()

// 定义 list total
const list = ref([])
const total = ref(0)

const currentPage = ref(1)
const pageSizeRef = ref(10)

// 使用watchEffect 监听url 参数 page pageSize category keyword 的变化，并获取博客列表和总数
watchEffect(async () => {
  currentPage.value = +$route.query.page || 1
  pageSizeRef.value = +$route.query.pageSize || 10

  const queryInfo = {
    page: +$route.query.page || 1,
    pageSize: +$route.query.pageSize || 10,
    category: $route.query.category,
    keyword: $route.query.keyword
  }
  const { list: blogList, total: blogTotal } = await getBlogList(queryInfo)
  console.log(blogList, blogTotal)
  list.value = blogList
  total.value = blogTotal
})

const handlePageChange = (newPage) => {
  $router.push({
    path: $route.path,
    query: {
      page: newPage,
      pageSize: pageSizeRef.value
    }
  })
}
</script>

<template>
  <div v-for="item in list" :key="item.id">
    <blog-card :blog="item"></blog-card>
  </div>

  <div class="pagination-container">
    <el-pagination
      :total="total"
      :page-size="pageSizeRef"
      layout="prev, pager, next"
      :currentPage="currentPage"
      @current-change="handlePageChange"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination {
  margin-top: 10px;
}
</style>
