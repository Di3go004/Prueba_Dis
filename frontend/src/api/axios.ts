import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de request — agrega el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de response — maneja errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const hasToken = !!localStorage.getItem('token')
    const isAuthEndpoint = error.config?.url?.includes('/auth/')

    // Solo redirigir si la sesión expiró (hay token pero el backend rechaza).
    // NO redirigir en endpoints de login/register — ahí el 401 es normal.
    if (error.response?.status === 401 && hasToken && !isAuthEndpoint) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default api