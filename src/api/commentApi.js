import axiosInstance from './axiosInstance'

// 获取文章评论
export async function getBlogComments(blogId) {
  try {
    const response = await axiosInstance.get(`/api/blogs/${blogId}/comments`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 发表评论
export async function createComment(blogId, commentData) {
  try {
    const response = await axiosInstance.post(`/api/blogs/${blogId}/comments`, commentData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 删除评论
export async function deleteComment(commentId) {
  try {
    const response = await axiosInstance.delete(`/api/comments/${commentId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 其他评论相关的API请求
// ...
