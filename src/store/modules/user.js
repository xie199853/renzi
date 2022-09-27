import { loginAPI } from '@/api/login'
import { getInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    rmoveUserInfo(state) {
      state.userInfo = {}
    },
    removeToken(state) {
      state.token = null
    },
    setHrsaasTime(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }

  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await loginAPI(loginData)
      console.log(data)
      commit('setToken', data)
      commit('setHrsaasTime', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      //  请求接口
      const res = await getInfo()
      const res1 = await getUserDetailById(res.userId)
      console.log(111)
      const result = { ...res, ...res1 }
      commit('setUserInfo', result)
      return JSON.parse(JSON.stringify(res))
    },
    loginout({ commit }) {
      commit('rmoveUserInfo')
      commit('removeToken')
    }
  }
}
