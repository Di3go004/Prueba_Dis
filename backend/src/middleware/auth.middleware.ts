import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";



export interface AuthRequest extends Request{
  userId?:string;
  userEmail?:string;
}

export const authMiddleware = (
  req : AuthRequest,
  res : Response,
  next : NextFunction
) : void => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(401).json({success:false, message: 'Token no proporcionado'});
    return;
  }

  const token = authHeader.split(' ')[1];

  try{
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as {id: string, email: string};
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  }catch(error){
    res.status(401).json({success:false, message: 'Token invalido'});
  }
}