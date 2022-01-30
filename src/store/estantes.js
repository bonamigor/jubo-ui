import { createStore } from 'vuex'

export default createStore({
  state: {
    estante: { id: '', cliente: '', periodo: '', ativa: '' },
    estantes: []
  },
  getters: {
    getEstantes: state => {
      return state.estantes
    }
  },
  mutations: {
    GET_ESTANTES (state, estantes) {
      state.estantes = estantes
    }
  },
  actions: {
    async getEstantes ({ commit }, payload) {
      try {
        commit('GET_ESTANTES', payload)
      } catch (error) {
        console.log('Erro no Store - getEstantes', error)
      }
    }
  }
})
