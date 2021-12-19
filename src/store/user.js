import { createStore } from 'vuex'

export default createStore({
  state: {
    user: { id: '', nome: '', email: '', admin: '' },
    users: []
  },
  getters: {
    getUsers: state => {
      return state.users
    }
  },
  mutations: {
    GET_USERS (state, users) {
      state.users = users
    }
  },
  actions: {
    async getUsers ({ commit }, payload) {
      try {
        commit('GET_USERS', payload)
      } catch (error) {
        console.log('Erro no Store - getUsers', error)
      }
    }
  }
})
