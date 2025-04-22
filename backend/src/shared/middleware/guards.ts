import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { MyJwt } from "../../types/express";
import { Role } from "@prisma/client";

export function jwtGuard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.sendStatus(401);
    return;
  }
  try {
    req.user = jwt.verify(auth.slice(7), env.jwtAccessSecret) as MyJwt;
    next();
  } catch {
    res.sendStatus(401);
  }
}

export function roleGuard(allowed: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role;
    if (role && allowed.includes(role)) next();
    else res.sendStatus(403);
  };
}
