import {Request, Response} from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController{
  
  async register(req: Request, res: Response): Promise<void>{
    try{
      const result = await authService.register(req.body);
      res.status(201).json({ message: "Usuario registrado exitosamente", data: result});
    }catch(error){
      res.status(400).json({ message: 'Error al registrar usuario' });
    }
  }

  async login(req: Request, res: Response): Promise<void>{
    try{
      const result = await authService.login(req.body);
      res.status(200).json({ message: "Usuario logueado exitosamente", data : result});
    }catch(error){
      res.status(400).json({ message: 'Error al loguear usuario' });
    }
  }

  
}