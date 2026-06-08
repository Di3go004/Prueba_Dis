export interface RegisterDTO {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user:{
    id: string;
    nombre: string;
    email: string;
  }
}