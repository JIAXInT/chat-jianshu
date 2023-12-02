<script setup>
import { reactive, onMounted, toRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetails, likeBlog, unlikeBlog, favoriteBlog, unfavoriteBlog } from '@/api/blogApi'
import usePageTitle from '@/hooks/usePageTitle'
import MarkdownIt from 'markdown-it'
import commentView from '@/views/sub-views/commentView.vue'

const md = new MarkdownIt()

const $route = useRoute()

const blogInfo = reactive({})

// onMounted 时获取博客详情
const blogId = $route.params.id || ''

onMounted(async () => {
  const res = await getBlogDetails(blogId)
  blogInfo.id = res.data.id
  blogInfo.title = res.data.title
  blogInfo.content = res.data.content
  blogInfo.category = res.data.category
  blogInfo.createdAt = res.data.createdAt
  blogInfo.updateAt = res.data.updateAt
  blogInfo.author = res.data.author
  blogInfo.likes = res.data.likes
  blogInfo.isLiked = res.data.isLiked
  blogInfo.favorites = res.data.favorites
  blogInfo.isFavorited = res.data.isFavorited
  blogInfo.comments = res.data.comments
})

// 格式化内容
const formattedContent = computed(() => {
  return md.render(blogInfo.content || '')
})

// 点赞和取消点赞
function likeBlogHandler() {
  if (blogInfo.isLiked) {
    unlikeBlog(blogInfo.id).then(() => {
      blogInfo.likes--
      blogInfo.isLiked = false
    })
  } else {
    likeBlog(blogInfo.id).then(() => {
      blogInfo.likes++
      blogInfo.isLiked = true
    })
  }
}

// 收藏和取消收藏
function favoriteBlogHandler() {
  if (blogInfo.isFavorited) {
    unfavoriteBlog(blogInfo.id).then(() => {
      blogInfo.favorites--
      blogInfo.isFavorited = false
    })
  } else {
    favoriteBlog(blogInfo.id).then(() => {
      blogInfo.favorites++
      blogInfo.isFavorited = true
    })
  }
}

// 修改标题
usePageTitle(toRef(blogInfo, 'title'))
</script>

<template>
  <!-- 显示 title author createdAt content -->
  <div>
    <h1>{{ blogInfo.title }}</h1>
    <p>
      <span>作者：{{ blogInfo.author }}</span>
      <span>创建时间：{{ blogInfo.createdAt }}</span>
    </p>
    <div v-html="formattedContent"></div>
  </div>

  <!-- 生成一个div，用于点赞和收藏，水平居中显示 -->
  <div style="display: flex; justify-content: center; margin-top: 20px">
    <!-- 点赞按钮 -->
    <el-button
      class="btn btn-primary"
      :type="blogInfo.isLiked ? 'primary' : 'default'"
      @click="likeBlogHandler"
    >
      点赞
      <el-icon><Pointer /></el-icon>
      <span>{{ blogInfo.likes }}</span>
    </el-button>
    <!-- 收藏按钮 -->
    <el-button
      class="btn btn-primary"
      :type="blogInfo.isFavorited ? 'primary' : 'default'"
      @click="favoriteBlogHandler"
    >
      收藏
      <el-icon><Star /></el-icon>
      <span>{{ blogInfo.favorites }}</span>
    </el-button>
  </div>

  <commentView></commentView>
</template>
<style>
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}
p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
p span {
  font-size: 14px;
}
div {
  font-size: 16px;
}
</style>
