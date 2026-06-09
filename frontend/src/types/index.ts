
export const Categoria = {
  Fertilizantes: 'Fertilizantes',
  Maquinaria: 'Maquinaria',
  Semillas: 'Semillas',
  Agroquimicos: 'Agroquimicos'
} as const

export type Categoria = typeof Categoria[keyof typeof Categoria]


export interface User {
  id: string
  nombre: string
  email: string
}

export interface Product {
  id: string
  codigo: string
  nombre: string
  descripcion: string
  precio: number
  categoria: Categoria
  createdBy: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    nombre: string
    email: string
  }
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}