// 实现对axios
import axios from 'axios'
import { Message } from 'element-ui'
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})
service.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) { // 业务逻辑成功
    return data
  }
  // 业务逻辑失败
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
