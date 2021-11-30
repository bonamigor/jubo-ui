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
  }
})
