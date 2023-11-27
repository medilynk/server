import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Managing Apppointments
export const get_doctor_appointments = async (req, res) => { 
    try {
        let token = req.headers.authorization.split(" ")[1];
        const validated = jwt.verify(token, process.env.JWT_SECRET);
        const doctor_id = validated.id;
        const all_appointments = await prisma.appointment.findMany({
            where: {
                doctor_id: doctor_id,
            },
        });
        res.status(200).json({
            message: "Fetched appointments.",
            data: all_appointments,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Managing Prescriptions
export const write_prescription = async (req, res) => {
  try {
    const { patient_id, doctor_id, medication_name, dosage, instructions } =
      req.body;
    const created_prescription = await prisma.prescription.create({
      data: {
        patient_id: patient_id,
        doctor_id: doctor_id,
        medication_name: medication_name,
        dosage: dosage,
        instructions: instructions,
        date_prescribed: new Date(),
      },
    });
    res
      .status(201)
      .json({ message: "Created Prescription.", data: created_prescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const edit_prescription = async (req, res) => {
  try {
    const { id, medication_name, dosage, instructions } = req.body;
    const updated_prescription = await prisma.prescription.update({
      where: {
        id: id,
      },
      data: {
        medication_name: medication_name,
        dosage: dosage,
        instructions: instructions,
      },
    });
  } catch (error) {}
};
