import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, removeItem, updateItem } = useCart();

  if (items.length === 0)
    return (
      <p className="p-4">
        El carrito está vacío.{" "}
        <Link className="text-primary underline" to="/">
          Volver a comprar
        </Link>
      </p>
    );

  const total = items.reduce((s, it) => s + it.product.price * it.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Tu carrito</h1>
      {items.map((it) => (
        <div
          key={it.product.id}
          className="mb-3 flex items-center gap-4 border-b pb-2"
        >
          <span className="flex-1">{it.product.name}</span>
          <input
            type="number"
            min={1}
            value={it.quantity}
            onChange={(e) => updateItem(it.product.id, Number(e.target.value))}
            className="w-16 rounded border px-2 py-1 text-center"
          />
          <span>${it.product.price * it.quantity}</span>
          <button
            className="text-secondary"
            onClick={() => removeItem(it.product.id)}
          >
            ✕
          </button>
        </div>
      ))}

      <h2 className="my-4 text-xl font-bold">Total: ${total}</h2>
      <Link
        to="/checkout"
        className="rounded bg-primary px-4 py-2 text-accent hover:bg-secondary"
      >
        Pagar
      </Link>
    </div>
  );
};

export default CartPage;
