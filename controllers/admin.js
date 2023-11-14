import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const add_dept = async (req, res) => {
  try {
    const { name } = req.body;
    const createdDept = await prisma.department.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ message: "Department created.", data: createdDept });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
