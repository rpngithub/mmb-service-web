import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('mmb_access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let failedQueue = []
const REFRESH_ERROR_CODES = ['NO_TOKEN', 'INVALID_TOKEN', 'INVALID_OR_EXPIRED_TOKEN', 'TOKEN_REVOKED']

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API error:', error)
    console.log('Error response data:', error.response?.data)
    const errorResponse = error.response?.data || {}
    let errorCode = errorResponse.code || '';
    if (errorCode) {
      console.error('API error message:', errorCode, errorResponse.error)
    }
    
    const originalRequest = error.config

    if (error.response?.status === 401 && REFRESH_ERROR_CODES.includes(errorCode) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return client(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await client.post('/auth/refresh')
        const newToken = data.accessToken
        localStorage.setItem('mmb_access_token', newToken)
        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return client(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('mmb_access_token')
        window.location.href = '/signin'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default client
