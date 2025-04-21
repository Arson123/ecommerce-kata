import { PrismaClient, Product } from "@prisma/client";

export class ProductService {
  private prisma = new PrismaClient();

  list(page = 1, size = 10): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip: (page - 1) * size,
      take: size,
      orderBy: { createdAt: "desc" },
    });
  }

  create(data: {
    name: string;
    price: number;
    stock: number;
    description: string | null;
  }): Promise<Product> {
    return this.prisma.product.create({ data });
  }
}
