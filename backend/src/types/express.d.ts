import { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface MyJwt extends JwtPayload {
  sub: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: MyJwt;
    }
  }
}
