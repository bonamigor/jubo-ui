import { createStore } from 'vuex'

export default createStore({
  state: {
    produto: { id: '', nome: '', preco_custo: '', unidade_medida: '' },
    produtos: []
  },
  getters: {
    getProdutos: state => {
      return state.produtos
    }
  },
  mutations: {
    GET_PRODUTOS (state, produtos) {
      state.produtos = produtos
    }
  },
  actions: {
    async getProdutos ({ commit }, payload) {
      try {
        commit('GET_PRODUTOS', payload)
      } catch (error) {
        console.log('Erro no Store - getprodutos', error)
      }
    }
  }
})
