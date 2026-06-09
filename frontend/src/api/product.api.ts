import api from './axios'
import type { Product, ApiResponse } from '../types'
import type { Categoria } from '../types'

export const getProductsApi = async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>('/products/listado')
  return response.data.data!
}

export const getProductApi = async (id: string): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(`/products/producto/${id}`)
  return response.data.data!
}

export const createProductApi = async (data: {
  codigo: string
  nombre: string
  descripcion: string
  precio: number
  categoria: Categoria
}): Promise<Product> => {
  const response = await api.post<ApiResponse<Product>>('/products/crear', data)
  return response.data.data!
}

export const updateProductApi = async (id: string, data: Partial<{
  codigo: string
  nombre: string
  descripcion: string
  precio: number
  categoria: Categoria
}>): Promise<Product> => {
  const response = await api.put<ApiResponse<Product>>(`/products/modificar/${id}`, data)
  return response.data.data!
}

export const deleteProductApi = async (id: string): Promise<void> => {
  await api.delete(`/products/eliminar/${id}`)
}