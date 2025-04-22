import { Router } from "express";
import { z } from "zod";
import asyncHandler from "express-async-handler";
import { ProductService } from "../application/services/product.service";
import { roleGuard, jwtGuard } from "../shared/middleware/guards";

const router = Router();
const svc = new ProductService();

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  imageUrl: z.string().url().or(z.literal("")).optional(),
});

// GET /products  (público)
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await svc.list());
  })
);

// POST /products  (ADMIN)
router.post(
  "/",
  jwtGuard,
  roleGuard(["ADMIN"]),
  asyncHandler(async (req, res) => {
    const data = productSchema.parse(req.body);
    res.status(201).json(await svc.create(data));
  })
);

// PUT /products/:id  (ADMIN)
router.put(
  "/:id",
  jwtGuard,
  roleGuard(["ADMIN"]),
  asyncHandler(async (req, res) => {
    const data = productSchema.partial().parse(req.body);
    res.json(await svc.update(req.params.id, data));
  })
);

// DELETE /products/:id  (ADMIN)
router.delete(
  "/:id",
  jwtGuard,
  roleGuard(["ADMIN"]),
  asyncHandler(async (req, res) => {
    await svc.remove(req.params.id);
    res.status(204).end();
  })
);

export default router;
