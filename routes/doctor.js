import express from "express";
import { verify_doctor } from "../middleware/auth.js";
import { get_doctor_appointments } from "../controllers/doctor.js";
import {
  edit_prescription,
  write_prescription,
  get_appointment_by_date,
} from "../controllers/doctor.js";

const router = express.Router();

router.get("/appointments", verify_doctor, get_doctor_appointments);
router.post("/prescription", verify_doctor, write_prescription);
router.patch("/prescription", verify_doctor, edit_prescription);
router.post("/appointment/get", verify_doctor, get_appointment_by_date);

export default router;
