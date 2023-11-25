import axiosInstance from './axiosInstance';

const commentApi = {
  // 获取文章评论
  async getArticleComments(articleId) {
    try {
      const response = await axiosInstance.get(`/api/articles/${articleId}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 发表评论
  async createComment(articleId, commentData) {
    try {
      const response = await axiosInstance.post(`/api/articles/${articleId}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 删除评论
  async deleteComment(commentId) {
    try {
      const response = await axiosInstance.delete(`/api/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 其他评论相关的API请求
  // ...
};

export default commentApi;