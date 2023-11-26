import axiosInstance from './axiosInstance'

// 用户注册
export async function registerUser(userData) {
  try {
    const response = await axiosInstance.post('/api/users/register', userData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 用户登录
export async function loginUser(userData) {
  try {
    const response = await axiosInstance.post('/api/users/login', userData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//获取用户信息
export async function getUserInfo(token) {
  try {
    const response = await axiosInstance.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 其他用户相关的API请求
// ...
