import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id } = req.body;

    const created_appointment = await prisma.appointment.create({
      data: {
        doctor_id: doctor_id,
        patient_id: patient_id,
      },
    });

    res
      .status(200)
      .json({
        message: "succesfully created appointment",
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

    res
      .status(200)
      .json({
        message: "successfully updated appointment",
        data: update_appointment,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete_appointment = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted_appoinment = await prisma.appointment.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "appoiment successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const read_appointment_all = async (req, res) => {
  try {
    const all_appointments = await prisma.appointment.findMany();

    res
      .status(200)
      .json({
        message: "successfully fetched all appointments",
        data: all_appointments,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const read_appointment_unique = async (req, res) => {
  try {
    const { doctor_id } = req.body;

    const all_appointments = await prisma.appointment.findUnique({
      where: {
        doctor_id: doctor_id,
      },
    });

    res
      .status(200)
      .json({ message: "successfully fetched unique appointments" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
