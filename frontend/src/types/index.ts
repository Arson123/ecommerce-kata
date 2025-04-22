export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export type Role = "CUSTOMER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  total: number;
  date: string;
  items: OrderItemDTO[];
}
