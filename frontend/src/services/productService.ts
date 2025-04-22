import { api } from "./api";
import { Product } from "../types";

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get("/products");
    return data;
  },
  create: async (p: ProductInput): Promise<Product> => {
    const { data } = await api.post("/products", p);
    return data;
  },
  update: async (id: string, p: ProductInput): Promise<Product> => {
    const { data } = await api.put(`/products/${id}`, p);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
