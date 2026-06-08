import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { LoginDTO, RegisterDTO, AuthResponseDTO } from "../dtos/auth.dto";

const userRepository = new UserRepository();

export class AuthService {

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const existingUser = await userRepository.findByEmail(data.email)
    if(existingUser){
      throw new Error('El email ya esta registrado')
    }

    const hashedPasword = await bcrypt.hash(data.password, 10)

    const user = await userRepository.create({
      ...data, password: 
      hashedPasword
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN as any }
    )
    
    // token de respuesta al registrar un nuevo usuario
    return{
      token,
      user:{
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    }
  }

  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await userRepository.findByEmail(data.email)
    if(!user){
      throw new Error('Credenciales no validas');
    }

    const validPassword = await bcrypt.compare(data.password, user.password)
    if(!validPassword){
      throw new Error('Credenciales no validas')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN as any }
    )

    return{
      token,
      user:{
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    }
  }
}