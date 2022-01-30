export default httpClient => ({
  listarUmProduto: async (id) => {
    const response = await httpClient.get(`/api/produtos/${id}`)

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  listarTodosOsProdutos: async () => {
    const response = await httpClient.get('/api/produtos')

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  cadastrarProduto: async ({ nome, precoCusto, unidadeMedida }) => {
    const response = await httpClient.post(
      '/api/produtos',
      { nome, precoCusto, unidadeMedida }
    )

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  atualizarProduto: async ({ nome, precoCusto, unidadeMedida, id }) => {
    const response = await httpClient.put(
      '/api/produtos',
      { nome, precoCusto, unidadeMedida, id }
    )

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },
  deletarProduto: async (id) => {
    const response = await httpClient.delete(
      `/api/produtos/${id}`
    )

    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})
