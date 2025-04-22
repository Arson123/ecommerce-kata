import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0)
    return <p className="p-4">No hay productos en el carrito.</p>;

  const total = items.reduce((s, it) => s + it.product.price * it.quantity, 0);

  const handlePay = async () => {
    await orderService.createOrder(items);
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Confirmar compra</h1>
      <ul className="mb-3 list-disc pl-6">
        {items.map((it) => (
          <li key={it.product.id}>
            {it.product.name} x {it.quantity} – $
            {it.product.price * it.quantity}
          </li>
        ))}
      </ul>
      <p className="mb-4 font-bold">Total: ${total}</p>
      <button
        className="rounded bg-primary px-4 py-2 text-accent hover:bg-secondary"
        onClick={handlePay}
      >
        Pagar ahora
      </button>
    </div>
  );
};

export default CheckoutPage;
