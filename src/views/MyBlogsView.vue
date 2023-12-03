<script setup>
import usePageTitle from '@/hooks/usePageTitle'
import useNavToLogin from '@/hooks/useNavToLogin'
import useGetBlogList from '../hooks/useGetBlogLost'
import { useRouter } from 'vue-router'
import listPage from '../components/listPage.vue'
import { deleteBlog } from '@/api/blogApi'

const router = useRouter()

useNavToLogin() // 判断是否登录

usePageTitle('我的博客')

const { list, total, currentPage, pageSizeRef, getBlogListFn } = useGetBlogList({ my: true })

// 编辑博客跳转到编辑页
function handleEdit(blogId) {
  router.push(`/blog/${blogId}/edit/`)
}

// 删除博客
const handleDelete = async (blogId) => {
  const confirm = window.confirm('确认删除吗？')
  if (confirm) {
    deleteBlog(blogId)
    getBlogListFn()
  }
}
</script>

<template>
  <!-- 用table显示博客列表 包括title category likes favorites comments caeatedAt ，再加两个操作按钮 “编辑” “删除” -->
  <div>
    <el-table :data="list" border>
      <!-- 标题列 点击标题跳转到详情页 -->
      <el-table-column prop="title" label="标题" width="200">
        <template #default="{ row }">
          <router-link :to="`/blog-detail/${row.id}`">{{ row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类"></el-table-column>
      <el-table-column prop="likes" label="点赞数"></el-table-column>
      <!-- 点赞数 -->
      <el-table-column prop="favorites" label="收藏数"></el-table-column>
      <!-- 收藏数 -->
      <el-table-column prop="comments" label="评论数"></el-table-column>
      <!-- 评论数 -->
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
    </el-table>
  </div>

  <list-page :total="total" :current-page="currentPage" :page-size="pageSizeRef"></list-page>
</template>

<style scoped></style>
