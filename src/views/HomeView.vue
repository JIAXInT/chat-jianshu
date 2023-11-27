<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import usePageTitle from '@/hooks/usePageTitle'
import { getBlogList } from '@/api/blogApi'
import BlogCard from '../components/BlogCard.vue'

usePageTitle('首页')

const $route = useRoute()

// 定义 list total
const list = ref([])
const total = ref(0)

// 使用watchEffect 监听url 参数 page pageSize category keyword 的变化，并获取博客列表和总数
watchEffect(async () => {
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
</script>

<template>
  <div v-for="item in list" :key="item.id">
    <blog-card :blog="item"></blog-card>
  </div>
</template>
