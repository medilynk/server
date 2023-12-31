import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { gen_prescription_id } from "../utilities/gen_id.js";

const prisma = new PrismaClient();

// Managing Apppointments
export const get_doctor_appointments = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    const validated = jwt.verify(token, process.env.JWT_SECRET);
    if (!validated) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    const all_appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: validated.id,
      },
    });
    res.status(200).json({
      message: "Fetched appointments.",
      data: all_appointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get_appointment_by_date = async (req, res) => {
  try {
    const { date } = req.body;
    let token = req.headers.authorization.split(" ")[1];
    const validated = jwt.verify(token, process.env.JWT_SECRET);
    if (!validated) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    let startDate = new Date(date);
    let endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    const appointments = await prisma.appointment.findMany({
      where: {
        doctor_id: validated.id,
        scheduled_date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
    res.status(200).json({
      message: "Fetched appointments by date.",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Managing Prescriptions
export const write_prescription = async (req, res) => {
  try {
    const { patient_id, doctor_id, medication_name, dosage, instructions } =
      req.body;
    const id = gen_prescription_id();
    const created_prescription = await prisma.prescription.create({
      data: {
        id: id,
        patient_id: patient_id,
        doctor_id: doctor_id,
        medication_name: medication_name,
        dosage: dosage,
        instructions: instructions,
        date_prescribed: new Date().toISOString().split("T")[0],
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
    const { id, ...otherData } = req.body;
    const updated_prescription = await prisma.prescription.update({
      where: {
        id: id,
      },
      data: {
        otherData,
      },
    });
  } catch (error) {}
};
