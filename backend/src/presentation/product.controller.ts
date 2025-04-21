import { Router, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { Role } from "@prisma/client";
import { ProductService } from "../application/services/product.service";
import { authGuard } from "../shared/middleware/auth.middleware";
import { roleGuard } from "../shared/middleware/role.guard";
import { AuthRequest } from "../shared/middleware/auth.middleware";

const router = Router();
const productService = new ProductService();

/** validación */
const productDto = z.object({
  name: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  description: z.string().nullable().optional(),
});

router.get(
  "/",
  asyncHandler(async (req, res: Response): Promise<void> => {
    const page = +(req.query.page ?? 1);
    const size = +(req.query.size ?? 10);
    const products = await productService.list(page, size);
    res.json(products);
  })
);

router.post(
  "/",
  authGuard,
  roleGuard(Role.ADMIN),
  asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const dto = productDto.parse(req.body);
    const product = await productService.create({
      ...dto,
      description: dto.description ?? null,
    });
    res.status(201).json(product);
  })
);

export default router;
