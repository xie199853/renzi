import { loginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await loginAPI(loginData)
      console.log(data)
      commit('setToken', data)
    }
  }
}
