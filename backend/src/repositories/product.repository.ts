import prisma from '../utils/prisma.client'
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto'

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      }
    })
  }

  async findByCodigo(codigo: string) {
    return prisma.product.findUnique({
      where: { codigo }
    })
  }

  async create(data: CreateProductDTO, userId: string) {
    return prisma.product.create({
      data: {
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoria: data.categoria,
        createdBy: userId
      }
    })
  }

  async update(id: string, data: UpdateProductDTO) {
    return prisma.product.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id }
    })
  }
}