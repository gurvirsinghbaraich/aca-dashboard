import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | null = null;

export default function getDatabase() {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }

  return prismaClient;
}
