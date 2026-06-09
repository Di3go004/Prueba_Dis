import { z } from 'zod'
import { Categoria } from '@prisma/client'

export const CreateProductSchema = z.object({
  codigo: z.string().min(1, 'El código es requerido'),
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  precio: z.number().positive('El precio debe ser mayor a 0'),
  categoria: z.nativeEnum(Categoria, { message: 'Categoría inválida' })
})

export const UpdateProductSchema = z.object({
  codigo: z.string().min(1).optional(),
  nombre: z.string().min(2).optional(),
  descripcion: z.string().min(10).optional(),
  precio: z.number().positive().optional(),
  categoria: z.nativeEnum(Categoria).optional()
})

export type CreateProductDTO = z.infer<typeof CreateProductSchema>
export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>