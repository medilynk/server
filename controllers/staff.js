import { PrismaClient } from "@prisma/client";
import { gen_patient_id, gen_appointment_id } from "../utilities/gen_id.js";

const prisma = new PrismaClient();

// Managing Apppointments
export const create_appointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, scheduled_date } = req.body;
    const id = gen_appointment_id();
    const created_appointment = await prisma.appointment.create({
      data: {
        id: id,
        scheduled_date: new Date(scheduled_date).toISOString(),
        doctor: {
          connect: {
            id: doctor_id,
          },
        },
        patient: {
          connect: {
            id: patient_id,
          },
        },
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
    const { id, scheduled_date } = req.body;
    const updated_appointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        scheduled_date: new Date(scheduled_date).toISOString(),
      },
    });
    res.status(200).json({
      message: "Updated appointment.",
      data: updated_appointment,
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

export const get_appointments = async (req, res) => {
  try {
    const { date, ...otherData } = req.body;
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const appointments = await prisma.appointment.findMany({
      where: {
        scheduled_date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      where: {
        ...otherData,
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

export const update_patient = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedPatient = await prisma.patient.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    res.status(200).json({
      message: "Updated patient.",
      data: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete_patient = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedPatient = await prisma.patient.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Patient Deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get_patient = async (req, res) => {
  try {
    const { id } = req.body;
    const patient = await prisma.patient.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Patient fetched.", data: patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
