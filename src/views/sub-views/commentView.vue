<script setup>
import { onMounted, ref } from 'vue'
import { getBlogComments, deleteComment, createComment } from '@/api/commentApi'
import { formatDate } from '@/utils/date'
import { useUserStore } from '@/stores/user'
import { ElMessageBox, ElMessage } from 'element-plus'

const { userInfo } = useUserStore()

// 获取评论列表
const comments = ref([])

onMounted(async () => {
  const res = await getBlogComments()
  comments.value = res
  console.log(comments.value)
})

// 删除评论
const handleDelete = async (id) => {
  // confirm 弹窗
  const isDelete = await ElMessageBox.confirm('此操作将永久删除该评论, 是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  if (!isDelete) return

  await deleteComment(id)
  const res = await getBlogComments()
  comments.value = res
}

// 发表评论
const commentContent = ref('')
const handleCreate = async () => {
  if (!commentContent.value) return ElMessage.error('评论内容不能为空')

  await createComment(commentContent.value)
  commentContent.value = ''

  const res = await getBlogComments()
  comments.value = res

  // 提示
  ElMessage.success('评论成功')
}
</script>

<template>
  <!-- 发表评论。 左右结构 一个输入框一个按钮 -->
  <div class="comment-form">
    <el-input v-model="commentContent" placeholder="请输入评论内容" />
    <el-button type="primary" @click="handleCreate">发表评论</el-button>
  </div>

  <!-- 评论列表 上部分显示用户昵称和评论时间，下部分显示评论内容，右侧显示删除按钮 -->
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <p>
        <span>
          <el-icon><User /></el-icon>
          <span>{{ comment.authorNickname }}</span>
          <span>{{ formatDate(comment.createdAt) }}</span>
        </span>
        <el-button type="text" @click="deleteComment(comment.id)">
          <!-- 如果 comment.authorUsername 等于 userInfo.username 则显示删除按钮 -->
          <el-icon
            v-if="comment.authorUsername === userInfo.username"
            @click="handleDelete(comment.id)"
            ><Delete
          /></el-icon>
        </el-button>
      </p>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.comment-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  border-bottom: none;
}

.comment-form .el-button {
  width: 100px;
  margin-left: 10px;
}
/* 评论列表样式 */
div {
  margin-top: 20px;
  border-bottom: 1px solid #eee;
}
p {
  display: flex;
  justify-content: space-between;
}
.comment-form .el-button {
  width: 100px;
}
/* 评论列表样式 */
div {
  margin-top: 20px;
  border-bottom: 1px solid #eee;
}
p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
p span {
  font-size: 14px;
  margin-right: 15px;
}
</style>
