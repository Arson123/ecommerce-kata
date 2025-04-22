import { useEffect, useState } from "react";
import { productService, ProductInput } from "../../services/productService";
import { Product } from "../../types";
import ProductFormModal from "./ProductFormModal";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [show, setShow] = useState(false);

  const load = () => productService.getAll().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data: ProductInput, id?: string) => {
    id
      ? await productService.update(id, data)
      : await productService.create(data);
    setShow(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar producto?")) {
      await productService.remove(id);
      load();
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Gestión de productos</h1>
      <button
        className="mb-3 rounded bg-primary px-3 py-1 text-accent"
        onClick={() => setShow(true)}
      >
        Nuevo producto
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary text-accent">
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Precio</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">${p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShow(true);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => handleDelete(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && (
        <ProductFormModal
          initial={editing ?? undefined}
          onClose={() => {
            setShow(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
