<script setup>
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()

// 定义属性
defineProps({
  total: {
    type: Number,
    default: 0
  },
  pageSizeRef: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const handlePageChange = (newPage) => {
  $router.push({
    query: {
      ...$route.query,
      page: newPage
    }
  })
}
</script>

<template>
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
