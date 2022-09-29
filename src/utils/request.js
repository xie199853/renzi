// 实现对axios
import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
const timeOut = 3600// s
function IsCheckTimeOut() {
  const currentTime = Date.now() // 现在的时间
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > timeOut // true 超时 // false
}
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})
// 完成获取用户资料接口和token注入
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/loginout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
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
  console.log(error.response)
  if (error.response && error.response.status === 401) {
    store.dispatch('user/loginout')
    router.push('/login')
    Message.error('token超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})
export default service
