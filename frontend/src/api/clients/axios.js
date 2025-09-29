import axios from 'axios'
import { selectCurrentToken } from '../../store/slices/auth'
import store from '../../store'

const api = axios.create({})

api.interceptors.request.use(
  (config) => {
    const token = selectCurrentToken(store.getState())
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error),
)

export default api
