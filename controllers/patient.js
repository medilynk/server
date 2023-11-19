import { PrismaClient } from "@prisma/client";
import { gen_patient_id } from "../utilities/gen_id.js";

const prisma = new PrismaClient();

export const register_patient = async (req, res) => {
  try {
    let id = gen_patient_id();
    let isUnique = false;
    while (!isUnique) {
      let existing_patient = await prisma.patient.findUnique({
        where: {
          id: id,
        },
      });
      if (!existing_patient) {
        isUnique = true;
      } else {
        id = gen_patient_id();
      }
    }
    const { first_name, last_name, email, phone } = req.body;
    const createdPatient = await prisma.patient.create({
      data: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
      },
    });
    res.status(201).json({ message: "Created patient.", data: createdPatient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
