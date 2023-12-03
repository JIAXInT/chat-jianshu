<script setup>
import usePageTitle from '@/hooks/usePageTitle'
import BlogCard from '../components/BlogCard.vue'
import useGetBlogList from '../hooks/useGetBlogLost'
import listPage from '../components/listPage.vue'

usePageTitle('首页')

const { list, total, currentPage, pageSizeRef } = useGetBlogList()
</script>

<template>
  <div v-for="item in list" :key="item.id">
    <blog-card :blog="item"></blog-card>
  </div>
  <list-page :total="total" :currentPage="currentPage" :pageSizeRef="pageSizeRef"></list-page>
</template>
