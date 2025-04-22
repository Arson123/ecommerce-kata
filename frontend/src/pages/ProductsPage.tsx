import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    productService.getAll().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Productos</h1>
      <div className="flex flex-wrap">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={() => addItem(p, 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
