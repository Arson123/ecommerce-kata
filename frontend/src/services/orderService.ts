import { api } from "./api";
import { CartItem, Order } from "../types";

export const orderService = {
  async createOrder(items: CartItem[]): Promise<void> {
    const payload = items.map((i) => ({
      productId: i.product.id,
      quantity: i.quantity,
    }));
    await api.post("/orders", { items: payload });
  },
  async getUserOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },
};
