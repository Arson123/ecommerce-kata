import { PrismaClient, Role, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export class AuthService {
  private prisma = new PrismaClient();

  async register(email: string, password: string): Promise<User> {
    console.log('passoooooooooo');
    const hash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, passwordHash: hash, role: Role.CUSTOMER },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      throw new Error('Credenciales inválidas');
  
    const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtAccessSecret, { expiresIn: '15m' });

    const { id, role } = user;
    return { token, user: { id, email, role } };
  }
  
}
