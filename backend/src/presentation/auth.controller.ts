import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { AuthService } from "../application/services/auth.service";

const router = Router();
const service = new AuthService();
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post(
  "/register",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = schema.parse(req.body);
    await service.register(email, password);
    res.status(201).json({ message: "registrado" });
  })
);

router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = schema.parse(req.body);
    const tokens = await service.login(email, password);
    res.json(tokens);
  })
);

export default router;
