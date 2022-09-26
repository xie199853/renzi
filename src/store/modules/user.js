import { loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
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
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await loginAPI(loginData)
      console.log(data)
      commit('setToken', data)
    },
    async getUserInfo({ commit }) {
      //  请求接口
      // commit('setUserInfo', '')
    }
  }
}
