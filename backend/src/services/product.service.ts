import { ProductRepository } from '../repositories/product.repository'
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto'

const productRepository = new ProductRepository()

export class ProductService {
  async getAll() {
    return productRepository.findAll()
  }

  async getById(id: string) {
    const product = await productRepository.findById(id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }
    return product
  }

  async create(data: CreateProductDTO, userId: string) {
    const existing = await productRepository.findByCodigo(data.codigo)
    if (existing) {
      throw new Error('Ya existe un producto con ese código')
    }
    return productRepository.create(data, userId)
  }

  async update(id: string, data: UpdateProductDTO) {
    const product = await productRepository.findById(id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }

    if (data.codigo && data.codigo !== product.codigo) {
      const existing = await productRepository.findByCodigo(data.codigo)
      if (existing) {
        throw new Error('Ya existe un producto con ese código')
      }
    }

    return productRepository.update(id, data)
  }

  async delete(id: string) {
    const product = await productRepository.findById(id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }
    return productRepository.delete(id)
  }
}