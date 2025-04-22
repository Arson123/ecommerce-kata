export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
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
