import { create_admin } from "../db/admin.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const check_admin = async () => {
  const email = process.env.ADMIN_EMAIL;
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      await create_admin();
    }
  } catch (error) {
    console.log(`Error occured: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};
