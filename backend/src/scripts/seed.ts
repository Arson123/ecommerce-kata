import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash("Admin123*", 10);
  await prisma.user.upsert({
    where: { email: "admin@davivienda.com" },
    update: {},
    create: {
      email: "admin@davivienda.com",
      passwordHash: hash,
      role: Role.ADMIN,
    },
  });
}
main().finally(() => prisma.$disconnect());
