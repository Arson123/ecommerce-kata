import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import { Order } from "../types";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    orderService
      .getUserOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  if (orders === null) return <p className="p-4">Cargando...</p>;
  if (orders.length === 0)
    return <p className="p-4">Sin compras registradas.</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Mis compras</h1>
      {orders.map((o) => (
        <div key={o.id} className="mb-4 rounded border p-3">
          <h2 className="mb-2 font-bold">
            Pedido #{o.id} – {new Date(o.date).toLocaleDateString()}
          </h2>
          <p className="mb-2">Total: ${o.total}</p>
          <ul className="list-disc pl-6">
            {o.items.map((i) => (
              <li key={i.productId}>
                Producto {i.productId} – {i.quantity} u.
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
