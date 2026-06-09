import { Response } from 'express'
import { ProductService } from '../services/product.service'
import { AuthRequest } from '../middleware/auth.middleware'

const productService = new ProductService()

export class ProductController {
  async listado(req: AuthRequest, res: Response): Promise<void> {
    try {
      const products = await productService.getAll()
      res.status(200).json({ success: true, data: products })
    } catch (error: any) {
      console.error('Listado error:', error)
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Error al obtener productos'
      })
    }
  }

  async getProducto(req: AuthRequest, res: Response): Promise<void> {
    try {
      const product = await productService.getById(req.params.id as string)
      res.status(200).json({ success: true, data: product })
    } catch (error: any) {
      console.error('GetProducto error:', error)
      res.status(404).json({ 
        success: false, 
        message: error.message || 'Producto no encontrado'
      })
    }
  }

  async crear(req: AuthRequest, res: Response): Promise<void> {
    try {
      const product = await productService.create(req.body, req.userId as string)
      res.status(201).json({ success: true, data: product })
    } catch (error: any) {
      console.error('Crear error:', error)
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Error al crear producto'
      })
    }
  }

  async modificar(req: AuthRequest, res: Response): Promise<void> {
    try {
      const product = await productService.update(req.params.id as string, req.body)
      res.status(200).json({ success: true, data: product })
    } catch (error: any) {
      console.error('Modificar error:', error)
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Error al modificar producto'
      })
    }
  }

  async eliminar(req: AuthRequest, res: Response): Promise<void> {
    try {
      await productService.delete(req.params.id as string)
      res.status(200).json({ 
        success: true, 
        message: 'Producto eliminado correctamente' 
      })
    } catch (error: any) {
      console.error('Eliminar error:', error)
      res.status(404).json({ 
        success: false, 
        message: error.message || 'Error al eliminar producto'
      })
    }
  }
}