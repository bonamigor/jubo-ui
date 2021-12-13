import { createStore } from 'vuex'

const id = window.sessionStorage.getItem('userId')
const nome = window.sessionStorage.getItem('userName')
const email = window.sessionStorage.getItem('userEmail')
const admin = window.sessionStorage.getItem('userAdmin')

export default createStore({

  state: {
    user: { id: id, nome: nome, email: email, admin: admin }
  },
  getters: {
    isAdmin: state => {
      return state.user.admin
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    CURRENT_USER (state, user) {
      state.user.id = user.id
      state.user.nome = user.nome
      state.user.email = user.email
      if (user.admin === 0) {
        state.user.admin = false
      } else {
        state.user.admin = true
      }
    },
    LOGOUT_USER (state) {
      state.user.id = ''
      state.user.nome = ''
      state.user.email = ''
      state.user.admin = ''
    }
  },
  actions: {
    async setUserData ({ commit }, payload) {
      try {
        commit('CURRENT_USER', payload)
      } catch (error) {
        console.log('Erro no Store - Set User Data', error)
      }
    },
    cleanCurrentUser ({ commit }) {
      commit('LOGOUT_USER')
    }
  }
})
