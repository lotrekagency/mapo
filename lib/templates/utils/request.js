import axios from 'axios'
import store from '~bossamodule/store'
import { getToken } from '~bossamodule/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API || 'http://localhost:8000', // Need to set env property during build (NUXT_ENV_BASE_API)
  timeout: 5000,
  withCredentials: false
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token && token !== 'undefined') {
      config.headers['Authorization'] = `Token ${token}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      if (response.status === 401 || response.status === 402 || response.status === 403) {
        store.dispatch('bossa/user/logout').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
