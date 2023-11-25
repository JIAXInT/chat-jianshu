import axiosInstance from './axiosInstance';

const blogApi = {
  // 获取文章列表
  async getArticleList() {
    return axiosInstance.get('/api/articles');
  },

  // 获取单篇文章详情
  async getArticleDetails(articleId) {
    return axiosInstance.get(`/api/articles/${articleId}`);
  },

  // 发布文章
  async createArticle(articleData) {
    return axiosInstance.post('/api/articles', articleData);
  },

  // 编辑文章
  async editArticle(articleId, articleData) {
    return axiosInstance.put(`/api/articles/${articleId}`, articleData);
  },

  // 删除文章
  async deleteArticle(articleId) {
    return axiosInstance.delete(`/api/articles/${articleId}`);
  },

  // 获取文章评论
  async getArticleComments(articleId) {
    return axiosInstance.get(`/api/articles/${articleId}/comments`);
  },

  // 发表评论
  async createComment(articleId, commentData) {
    return axiosInstance.post(`/api/articles/${articleId}/comments`, commentData);
  },

  // 删除评论
  async deleteComment(commentId) {
    return axiosInstance.delete(`/api/comments/${commentId}`);
  },

  // 点赞文章
  async likeArticle(articleId) {
    return axiosInstance.post(`/api/articles/${articleId}/like`);
  },

  //取消点赞
  async unlikeArticle(articleId) {
    return axiosInstance.delete(`/api/articles/${articleId}/like`);
  },

  // 收藏文章
  async favoriteArticle(articleId) {
    return axiosInstance.post(`/api/articles/${articleId}/favorite`);
  },

  // 取消收藏文章
  async unfavoriteArticle(articleId) {
    return axiosInstance.delete(`/api/articles/${articleId}/favorite`);
  },

  // 其他博客相关的API请求
  // ...
};

export default blogApi;