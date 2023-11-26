import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3000', // 设置请求的基础URL
  timeout: 5000 // 设置请求超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理，如添加请求头、验证等
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer' + token
    }
    return config
  },
  (error) => {
    // 处理请求错误
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在接收响应数据之前做一些处理
    return response.data
  },
  (error) => {
    // 处理响应错误
    console.error(error)
    return Promise.reject(error)
  }
)

// 封装常用的请求方法
export default {
  get(url, params) {
    return instance.get(url, { params })
  },
  post(url, data) {
    return instance.post(url, data)
  },
  put(url, data) {
    return instance.put(url, data)
  },
  delete(url) {
    return instance.delete(url)
  }
}
