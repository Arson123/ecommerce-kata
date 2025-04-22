# e‑commerce Kata — README ☕

> **Stack**:  
> *Backend* Node 20 + Express 5 + Prisma 6.6 → PostgreSQL 15  
> *Frontend* Vite 6 + React 18 + Tailwind 3  
> *Tests* Jest 30 / React Testing Library (opcional)

---

## 0 . Requisitos

| Herramienta | Versión probada |
|-------------|-----------------|
| **Node.js** | ≥ 20.11 (LTS) |
| **npm**     | ≥ 10 |
| **Docker Desktop** | 4.x (para la BD) |
| **Git**     | cualquier |

> ⚠️ Si no puedes usar Docker, instala PostgreSQL 15 en tu máquina y ajusta la URL de conexión.

---

## 1 . Clonar y preparar

```bash
git clone https://github.com/tu‑usuario/ecommerce-kata.git
cd ecommerce-kata
```

Estructura:

```
.
├─ backend/     # API + Prisma
└─ frontend/    # SPA React + Tailwind
```

---

## 2 . Backend

### 2.1 Levantar PostgreSQL en un contenedor

```bash
docker run -d --name pg \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 postgres:15
```

### 2.2 Instalar dependencias

```bash
cd backend
npm ci
```

### 2.3 Variables `.env`

`backend/.env`

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"

JWT_ACCESS_SECRET="super‑secret"
JWT_REFRESH_SECRET="super‑secret‑refresh"
```

### 2.4 Migraciones + seeding

```bash
npx prisma migrate dev --name init
npm run seed                # crea dos productos demo
```

### 2.5 Modo dev

```bash
npm run dev
# ⇒ http://localhost:3000/api/v1/ping  →  { ok: true }
```

---

## 3 . Frontend

### 3.1 Instalar dependencias

```bash
cd ../frontend
npm ci
```

### 3.2 Modo dev

```bash
npm run dev
# ⇒ http://localhost:5173
```

---

## 4 . Comandos útiles

| Carpeta | Script | Acción |
|---------|--------|--------|
| backend | `npm run dev` | API con ts‑node‑dev + watch |
| backend | `npm run build && npm start` | build JS a dist/ y lanza producción |
| backend | `npm run test` | Jest + Supertest |
| frontend| `npm run dev` | Vite + HMR |
| frontend| `npm run build` | build SPA a dist/ |
| ambos   | `npm run lint` | ESLint + Prettier |

---

## 5 . Modelo de base de datos (3FN)

| Tabla | Campos clave | Relaciones |
|-------|--------------|------------|
| **users** | `id` PK, `email` UNIQUE, `password_hash`, `role` | 1 → N carts, orders, refresh_tokens |
| **products** | `id` PK, `name`, `price DEC(10,2)`, `stock` | 1 → N cart_items, order_items |
| **carts** | `id` PK, `user_id` FK, `status` (`OPEN`/`CHECKED_OUT`) | 1 → N cart_items |
| **cart_items** | **PK compost** (`cart_id`, `product_id`), `quantity`, `unit_price` | N → 1 carts, products |
| **orders** | `id` PK, `user_id` FK, `total_amount DEC(12,2)`, `payment_ref`, `status` | 1 → N order_items |
| **order_items** | **PK compuesta** (`order_id`, `product_id`) | N → 1 orders, products |
| **refresh_tokens** | `id` PK, `user_id` FK, `token` UNIQUE, `expires_at` | 1 → 1 users |

*Transacción de checkout*  
`BEGIN` → crear orden + descontar stock + marcar carrito, todo en bloque → `COMMIT`.

---

## 6 . Flujo funcional

1. **Registro / login** → recibe `access` & `refresh` JWT.  
2. **Catálogo** (`GET /products`) muestra tarjetas uniformes.  
3. **Agregar al carrito** (`POST /cart/items`) reserva stock.  
4. **Pagar** (`POST /orders/checkout`)  
   * verifica stock,  
   * crea orden,  
   * descuenta stock definitivamente,  
   * vacía carrito.  
5. **Mis compras** (`GET /orders`) lista historial con líneas y totales.

---

## 7 . Deploy de referencia (Docker Compose)

```yml
version: "3.9"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgres
    ports: ["5432:5432"]

  api:
    build: ./backend
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/ecommerce?schema=public
    depends_on: [db]
    ports: ["3000:3000"]

  web:
    build: ./frontend
    depends_on: [api]
    ports: ["80:4173"]
```

---

## 8 . Roadmap

* WebSocket stock en tiempo real.  
* Stripe sandbox como pasarela real.  
* Tests E2E con Playwright.  
* CI/CD GitHub Actions (lint + tests + Docker build).

---

**¡Listo!**  
Clona, `npm ci`, levanta la BD, `npm run dev` en ambos lados y tendrás el e‑commerce corriendo. Cualquier duda o mejora, abre un issue ✨