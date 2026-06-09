import { Request, Response, NextFunction } from 'express'
import { ZodType } from 'zod'

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: result.error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
      return
    }

    req.body = result.data
    next()
  }
}