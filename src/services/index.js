import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UserService from './user'

const API_ENVS = {
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
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
  user: UserService(httpClient)
}
