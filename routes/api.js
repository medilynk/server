import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        dept_id: true,
        shift: true,
      },
    });
    res.status(200).json({ data: doctors });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
