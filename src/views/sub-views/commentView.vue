<script setup>
import { ref } from 'vue'
import { getBlogComments } from '@/api/commentApi'

// 获取评论列表
const comments = ref([])
const getComments = async () => {
  const { data } = await getBlogComments()
  comments.value = data.data

  console.log(comments.value)
}
getComments()
</script>

<template>pingl</template>

<style scoped></style>
