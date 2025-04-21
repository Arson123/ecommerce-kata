import { Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { AuthRequest } from "./auth.middleware";

export const roleGuard =
  (role: Role) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role === role) {
      next();
      return;
    }
    res.status(403).json({ message: "Prohibido" });
  };
