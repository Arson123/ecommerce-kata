import { Prisma, PrismaClient, Product } from "@prisma/client";

export class ProductService {
  private prisma = new PrismaClient();

  list(): Promise<Product[]> {
    return this.prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  }

  async create(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    imageUrl?: string;
  }): Promise<Product> {
    const dto: Prisma.ProductCreateInput = {
      ...data,
      price: new Prisma.Decimal(data.price),
    };
    return this.prisma.product.create({ data: dto });
  }

  async update(
    id: string,
    data: Partial<Omit<Product, "id" | "createdAt">>
  ): Promise<Product> {
    const dto: Prisma.ProductUpdateInput = {};

    if (data.name !== undefined) dto.name = data.name;
    if (data.description !== undefined) dto.description = data.description;
    if (data.stock !== undefined) dto.stock = data.stock;
    if (data.imageUrl !== undefined) dto.imageUrl = data.imageUrl;
    if (data.price !== undefined) {
      dto.price = new Prisma.Decimal(data.price);
    }

    return this.prisma.product.update({ where: { id }, data: dto });
  }

  remove(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
