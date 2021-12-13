export default httpClient => ({
  listarUmCliente: async (id) => {
    const response = await httpClient.get(`/api/clientes/${id}`)

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

  listarTodosOsClientes: async () => {
    const response = await httpClient.get('/api/clientes')

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

  cadastrarCliente: async ({ nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo }) => {
    const response = await httpClient.post(
      '/api/clientes',
      { nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo }
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

  atualizarCliente: async ({ nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo, id }) => {
    const response = await httpClient.put(
      '/api/clientes',
      { nome, cnpj, endereco, email, cidade, estado, cep, telefone, ativo, id }
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

  deletarCliente: async (id) => {
    const response = await httpClient.delete(
      `/api/clientes/${id}`
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
