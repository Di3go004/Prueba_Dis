import { RegisterDTO } from "../dtos/auth.dto";
import prisma from "../utils/prisma.client";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: RegisterDTO & {password: string}){
    return prisma.user.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
      }
    })
  }
}