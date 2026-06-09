import api from './axios'
import type { AuthResponse, ApiResponse } from '../types/index'

export const registerApi = async (data: {
  nombre: string
  email: string
  password: string
}): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/registrar', data)
  return response.data.data!
}

export const loginApi = async (data: {
  email: string
  password: string
}): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data)
  return response.data.data!
}