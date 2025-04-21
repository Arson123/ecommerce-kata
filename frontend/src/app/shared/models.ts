export interface LoginDTO {
  email: string;
  password: string;
}

export interface JwtPayload {
  access: string; // JWT firmado por el backend
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: string;
}
