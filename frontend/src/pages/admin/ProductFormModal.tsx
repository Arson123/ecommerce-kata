import { useState } from "react";
import { Product } from "../../types";
import { ProductInput } from "../../services/productService";

interface Props {
  initial?: Product;
  onClose: () => void;
  onSave: (data: ProductInput, id?: string) => void;
}

const ProductFormModal: React.FC<Props> = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState<ProductInput>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    stock: initial?.stock ?? 0,
    imageUrl: initial?.imageUrl ?? "",
  });

  const handle = (k: keyof ProductInput, v: any) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 grid place-items-center bg-black/50">
      <div className="w-full max-w-md rounded bg-accent p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {initial ? "Editar" : "Nuevo"} producto
        </h2>
        <input
          value={form.name}
          onChange={(e) => handle("name", e.target.value)}
          placeholder="Nombre"
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <textarea
          value={form.description}
          onChange={(e) => handle("description", e.target.value)}
          placeholder="Descripción"
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => handle("price", Number(e.target.value) || 0)}
          placeholder="Precio"
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <input
          type="number"
          value={form.stock}
          onChange={(e) => handle("stock", Number(e.target.value) || 0)}
          placeholder="Stock"
          className="mb-2 w-full rounded border px-2 py-1"
        />
        <input
          value={form.imageUrl}
          onChange={(e) => handle("imageUrl", e.target.value)}
          placeholder="URL Imagen"
          className="mb-4 w-full rounded border px-2 py-1"
        />
        <div className="flex justify-end gap-2">
          <button
            className="rounded bg-gray-400 px-3 py-1 text-accent"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rounded bg-primary px-3 py-1 text-accent"
            onClick={() => onSave(form, initial?.id)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
