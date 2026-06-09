import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.register(req.body)
      res.status(201).json({ success: true, data: result })
    } catch (error: any) {
      console.error('Register error:', error)
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Error al registrar usuario'
      })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await authService.login(req.body)
      res.status(200).json({ success: true, data: result })
    } catch (error: any) {
      console.error('Login error:', error)
      res.status(401).json({ 
        success: false, 
        message: error.message || 'Error al iniciar sesión'
      })
    }
  }
}