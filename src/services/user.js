export default httpClient => ({
  getUser: async ({ email, senha }) => {
    const response = await httpClient.post('/api/users/getUser', {
      email,
      senha
    })

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
  cadastrarUsuarioRegular: async ({ nome, email, senha, clienteId }) => {
    const response = await httpClient.post('/api/users/regular', {
      nome, email, senha, clienteId
    })

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
  cadastrarUsuarioAdmin: async ({ nome, email, senha, admin }) => {
    const response = await httpClient.post('/api/users/admin', {
      nome, email, senha, admin
    })

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
  atualizarUsuarioAdmin: async ({ nome, email, senha, admin, id }) => {
    const response = await httpClient.put(
      '/api/users/admin',
      { nome, email, senha, admin, id }
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
  atualizarUsuarioRegular: async ({ nome, email, senha, clienteId, id }) => {
    const response = await httpClient.put(
      '/api/users/regular',
      { nome, email, senha, clienteId, id }
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
  listarTodosOsUsuarios: async () => {
    const response = await httpClient.get('/api/users')

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
  listarUmUsuario: async (id) => {
    const response = await httpClient.get(`/api/users/${id}`)

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
  deletarUsuario: async (id) => {
    const response = await httpClient.delete(
      `/api/users/${id}`
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
