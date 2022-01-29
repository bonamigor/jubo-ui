import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UserService from './user'
import ClienteService from './cliente'
import ProdutoService from './produtos'
import EstanteService from './estante'

const API_ENVS = {
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => response, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500
  if (canThrowAnError) {
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home ' })
  }
  return error
})

export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient),
  cliente: ClienteService(httpClient),
  produto: ProdutoService(httpClient),
  estante: EstanteService(httpClient)
}
