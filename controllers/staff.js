import { PrismaClient } from "@prisma/client";
import { gen_patient_id } from "../utilities/gen_id.js";

const prisma = new PrismaClient();

// Managing Apppointments
export const create_appointment = async (req, res) => {
  try {
    const { patient_id, doctor_id } = req.body;
    const created_appointment = await prisma.appointment.create({
      data: {
        doctor_id: doctor_id,
        patient_id: patient_id,
      },
    });
    res.status(201).json({
      message: "Created Appointment.",
      data: created_appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update_appointment = async (req, res) => {
  try {
    const { doctor_id, patient_id, id } = req.body;
    const updated_appointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        patient_id: patient_id,
        doctor_id: doctor_id,
      },
    });
    res.status(200).json({
      message: "Updated appointment.",
      data: update_appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete_appointment = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted_appoinment = await prisma.appointment.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Appointment Deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const read_appointment_all = async (req, res) => {
  try {
    const all_appointments = await prisma.appointment.findMany();
    res.status(200).json({
      message: "Fetched all appointments.",
      data: all_appointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Managing Patients
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
