import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

import { verify_doctor, verify_staff } from "../middleware/auth.js";
import {
  createAppointment,
  delete_appointment,
  read_appointment_all,
  read_appointment_unique,
  update_appointment,
} from "../controllers/appointment.js";

router.post("/appointment/create", verify_staff, createAppointment);
router.patch("/appointment/update", verify_staff, update_appointment);
router.delete("/appointment/delete", verify_staff, delete_appointment);
router.get("/appointment/", verify_staff, read_appointment_all);

//doctor appointment

router.get("/appointment/doctor/:id", verify_doctor, read_appointment_unique);

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
