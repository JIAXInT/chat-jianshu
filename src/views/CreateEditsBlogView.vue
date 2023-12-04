<script setup>
import { useRoute, useRouter } from 'vue-router'
import useNavToLogin from '@/hooks/useNavToLogin'
import usePageTitle from '@/hooks/usePageTitle'
import { getBlogDetails, editBlog, createBlog } from '@/api/blogApi'
import { onMounted, reactive } from 'vue'

const $route = useRoute()
const $router = useRouter()

useNavToLogin()

// 获取url params id
const blogId = $route.params.id

// 定义title 根据id判断title
const title = blogId ? '编辑博客' : '创建博客'
usePageTitle(title)

// onMounted时 如果有id 则获取博客详情
const blogDetail = reactive({})
onMounted(async () => {
  if (blogId) {
    const data = await getBlogDetails(blogId)
    blogDetail.title = data.data.title
    blogDetail.content = data.data.content
    blogDetail.category = data.data.category

    console.log(data)
  }
})

const submit = async () => {
  // 执行提交事件的逻辑
  if (blogId) {
    await editBlog(blogId, blogDetail)
  } else {
    await createBlog(blogDetail)
  }
  $router.push('/my-blogs')
  alert('提交成功')
}
</script>

<template>
  <div class="top-container">
    <div class="top-left">
      <h2>{{ title }}</h2>
    </div>
    <div class="top-right">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>

  <div class="title-container">
    <div class="title-left">
      <h2>标题</h2>
      <el-input v-model="blogDetail.title"></el-input>
    </div>
    <div class="title-right">
      <h2>类型</h2>
      <el-select v-model="blogDetail.category">
        <el-option label="前端" value="前端"></el-option>
        <el-option label="Java" value="Java"></el-option>
        <el-option label="Python" value="Python"></el-option>
        <el-option label="小程序" value="小程序"></el-option>
      </el-select>
    </div>
  </div>

  <div class="content-container">
    <div class="content-left">
      <h2>内容</h2>
      <el-input type="textarea" v-model="blogDetail.content" style="height: 500px"></el-input>
    </div>
  </div>
</template>

<style scoped>
.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.top-left {
  flex: 1;
}

.top-right {
  margin-left: 10px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.title-left {
  flex: 1;
  margin-right: 10px;
}

.title-right {
  flex: 1;
  margin-left: 10px;
}

.content-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.content-left {
  flex: 1;
  margin-right: 10px;
}
</style>
