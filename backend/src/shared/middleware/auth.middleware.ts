import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "../../config/env";

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

export const authGuard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token requerido" });
    return;
  }
  try {
    const decoded = jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
    req.user = { id: decoded.sub as string, role: decoded.role as Role };
    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
  