// 实现对axios
import axios from 'axios'

// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})

export default service
