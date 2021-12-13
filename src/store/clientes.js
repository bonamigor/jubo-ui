import { createStore } from 'vuex'

export default createStore({
  state: {
    cliente: { id: '', nome: '' },
    clientes: []
  },
  getters: {
    getClientes: state => {
      return state.clientes
    }
  },
  mutations: {
    GET_CLIENTES (state, clientes) {
      state.clientes = clientes
    }
  },
  actions: {
    async getClientes ({ commit }, payload) {
      try {
        commit('GET_CLIENTES', payload)
      } catch (error) {
        console.log('Erro no Store - getClientes', error)
      }
    }
  }
})
