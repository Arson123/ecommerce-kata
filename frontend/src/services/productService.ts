import { api } from "./api";
import { Product } from "../types";

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products");
    return data;
  },
};
