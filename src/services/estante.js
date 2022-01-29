export default httpClient => ({
  listarUmaEstante: async (id) => {
    const response = await httpClient.get(`/api/estantes/${id}`)

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

  listarTodosAsEstantes: async () => {
    const response = await httpClient.get('/api/estantes-cliente')

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

  cadastrarEstante: async ({ periodo, clienteId }) => {
    const response = await httpClient.post(
      '/api/estantes',
      { periodo, clienteId }
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

  atualizarEstante: async ({ periodo, clienteId, id }) => {
    const response = await httpClient.put(
      '/api/estantes',
      { periodo, clienteId, id }
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
  deletarEstante: async (id) => {
    const response = await httpClient.delete(
      `/api/estantes/${id}`
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
