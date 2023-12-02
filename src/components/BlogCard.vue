<template>
  <div class="blog-card" @mouseover="isHover = true" @mouseleave="isHover = false">
    <div class="blog-card-header">
      <div class="author">
        <el-icon><User /></el-icon>
        {{ blog.author }}
      </div>
      <div class="category">
        <i class="el-icon-folder"></i>
        {{ blog.category }}
      </div>
      <div class="time">
        <i class="el-icon-time"></i>
        {{ formatDate(blog.updatedAt) }}
      </div>
    </div>
    <div class="blog-card-content">
      <h3 class="title">
        <a :href="`/blog-detail/${blog.id}`">{{ blog.title }}</a>
      </h3>
      <p class="description">{{ blog.description }}</p>
    </div>
    <div class="blog-card-footer">
      <div class="likes">
        <el-icon><Pointer /></el-icon>
        {{ blog.likes }}
      </div>
      <div class="favorites">
        <el-icon><Star /></el-icon>
        {{ blog.favorites }}
      </div>
      <div class="comments">
        <el-icon><ChatDotRound /></el-icon>
        {{ blog.comments }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatDate } from '@/utils/date'

const isHover = ref(false)
const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.blog-card:hover {
  background-color: #f2f6fc;
}

.blog-card-header,
.blog-card-footer {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.blog-card-content {
  margin-top: 10px;
}

.author,
.category,
.time {
  display: flex;
  align-items: center;
}

.author i,
.category i,
.time i {
  margin-right: 5px;
}

.title {
  font-size: 18px;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin-bottom: 10px;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
}

.likes,
.favorites,
.comments {
  display: flex;
  align-items: center;
}

.likes i,
.favorites i,
.comments i {
  margin-right: 5px;
}
</style>
