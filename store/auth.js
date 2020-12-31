import { getField, updateField } from 'vuex-map-fields'
import authApi from '@/api/auth.api'

export default {
  namespaced: true,
  
  state: () => ({
      status: {
        loggedIn: null,
        errors: []
      },
      loginForm: {
        email: "",
        password: ""
      }
    }),

  getters: {
    loggedIn: (state) => state.status.loggedIn,
    loginForm: (state) => state.loginForm,

    getField,
  },
  
  mutations: {
    loginSuccess(state) {
      state.status.loggedIn = true
    }, 

    updateField,
  },

  actions: {
    login({ commit, getters }) {
      const user = getters.loginForm

      return authApi.login(user)
        .then(res => {
          if (res.data.token) {
            commit('loginSuccess')
            localStorage.setItem('user', JSON.stringify(res.data))

            Promise.resolve()
          }
        }) 
    },
  },
}
