export default httpClient => ({
  login: async ({ email, senha }) => {
    const response = await httpClient.post('/api/autenticacao', {
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
  }
})
