import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { jwtGuard } from "../shared/middleware/guards";
import { MyJwt } from "../types/express";

const router = Router();
const prisma = new PrismaClient(); 

router.get(
  "/",
  jwtGuard,
  asyncHandler(async (req, res): Promise<void> => {
    const userId = (req.user as MyJwt).sub;
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    res.json(orders);
  })
);

router.post(
  "/checkout",
  jwtGuard,
  asyncHandler(async (req, res): Promise<void> => {
    const userId = (req.user as MyJwt).sub;

    const cart = await prisma.cart.findFirst({
      where: { userId, status: "OPEN" },
      include: { items: true },
    });
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: "Carrito vacío" });
      return;
    }

    const total = cart.items.reduce(
      (s, i) => s.add(i.unitPrice.mul(i.quantity)),
      new Prisma.Decimal(0)
    );
    const paymentRef = `SIM-${Date.now()}`;

    await prisma.$transaction(async (tx) => {
    });

    res.status(201).json({
      message: "Pago aprobado",
      paymentRef,
      total: total.toNumber(),
      items: cart.items,
    });    
  })
);

export default router;
