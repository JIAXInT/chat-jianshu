import axiosInstance from './axiosInstance'

// 获取文章列表
export async function getBlogList(opt = {}) {
  const { page = 1, pageSize = 10, category = '', keyword = '' } = opt
  const url = `/api/blogs?page=${page}&pageSize=${pageSize}&category=${category}&keyword=${keyword}`
  return (await axiosInstance.get(url)).data
}

// 获取单篇文章详情
export async function getBlogDetails(BlogId) {
  return axiosInstance.get(`/api/blogs/${BlogId}`)
}

// 发布文章
export async function createBlog(BlogData) {
  return axiosInstance.post('/api/blogs', BlogData)
}

// 编辑文章
export async function editBlog(BlogId, BlogData) {
  return axiosInstance.put(`/api/blogs/${BlogId}`, BlogData)
}

// 删除文章
export async function deleteBlog(BlogId) {
  return axiosInstance.delete(`/api/blogs/${BlogId}`)
}

// 获取文章评论
export async function getBlogComments(BlogId) {
  return axiosInstance.get(`/api/blogs/${BlogId}/comments`)
}

// 发表评论
export async function createComment(BlogId, commentData) {
  return axiosInstance.post(`/api/blogs/${BlogId}/comments`, commentData)
}

// 删除评论
export async function deleteComment(commentId) {
  return axiosInstance.delete(`/api/comments/${commentId}`)
}
// 点赞文章
export async function likeBlog(BlogId) {
  return axiosInstance.post(`/api/blogs/${BlogId}/like`)
}

//取消点赞
export async function unlikeBlog(BlogId) {
  return axiosInstance.delete(`/api/blogs/${BlogId}/like`)
}

// 收藏文章
export async function favoriteBlog(BlogId) {
  return axiosInstance.post(`/api/blogs/${BlogId}/favorite`)
}

// 取消收藏文章
export async function unfavoriteBlog(BlogId) {
  return axiosInstance.delete(`/api/blogs/${BlogId}/favorite`)
}

// 其他博客相关的API请求
// ...
