```md
# Ecommerce Kata – Angular + Node (Typescript)

## ✨ Stack

| Capa | Tecnología |
|------|-------------|
| Front‑end | Angular 17, RxJS 8, Vite, Tailwind |
| Back‑end  | Node 20, Express 5, Prisma ORM |
| DB        | PostgreSQL 15 (Docker) |
| Auth      | JWT (HS256) – access 15 min, refresh 7 días |

---

## ▶️ Arranque rápido

```bash
# 1. Clona
git clone https://github.com/<tu‑usuario>/ecommerce-kata.git
cd ecommerce-kata

# 2. Base de datos (Docker)
docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15

# 3. Backend
cd backend
cp .env.example .env        # edita los secretos
npm i
npm run prisma:migrate
npm run seed
npm run dev                 # http://localhost:3000

# 4. Frontend
cd ../frontend
npm i
npm start                   # http://localhost:4200
```

---

## 📚 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/api/v1/ping` | health‑check |
| POST   | `/api/v1/auth/register` | Registro |
| POST   | `/api/v1/auth/login` | Login – devuelve `{ access }` |
| GET    | `/api/v1/products` | Catálogo (paginado) |
| POST   | `/api/v1/products` | Crear producto (requiere **Bearer JWT** con role ADMIN) |

Carrito (`/cart`) y órdenes (`/orders`) se añaden en la siguiente iteración.

---

## 🧪 Pruebas

```bash
# back‑end
cd backend
npm run test         # Jest + Supertest

# front‑end
cd frontend
ng test              # Karma + Jasmine
```

## Autor

* **Nelson Arturo Cortes** – Full‑stack Dev (candidato)
* **Davivienda** – Equipo de Talent Acquisition
```