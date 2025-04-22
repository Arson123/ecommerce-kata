import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => (
  <div className="m-2 max-w-xs rounded border p-4 text-center">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="h-32 w-32 object-cover mx-auto"
    />
    <h3 className="mt-2 font-semibold">{product.name}</h3>
    <p className="text-sm text-secondary">{product.description}</p>
    <p className="my-1 text-lg font-bold">${product.price}</p>
    <button
      onClick={onAddToCart}
      className="rounded bg-primary px-3 py-1 text-accent hover:bg-secondary"
    >
      Añadir
    </button>
  </div>
);

export default ProductCard;
