import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create_admin = async () => {
  try {
    const first_name = process.env.ADMIN_FIRST_NAME;
    const last_name = process.env.ADMIN_LAST_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      throw new Error("No password provided for admin.");
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    if (!salt) {
      throw new Error("Salt not generated.");
    }
    const passHash = await bcrypt.hash(password, salt);
    const createdAdmin = await prisma.admin.create({
      data: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: passHash,
      },
    });
    console.log("Created Admin: ", createdAdmin);
  } catch (error) {
    console.error("Error in create_admin:", error);
  } finally {
    prisma.$disconnect();
  }
};
