import express from "express";
import { verify_staff } from "../middleware/auth.js";
import {
  get_patient,
  delete_patient,
  update_patient,
  register_patient,
  get_appointments,
  delete_appointment,
  update_appointment,
  create_appointment,
  get_doctor_by_name,
  read_appointment_all,
} from "../controllers/staff.js";

const router = express.Router();

// Managing Appointments
router.patch("/appointment/update", update_appointment);
router.get("/appointment", verify_staff, read_appointment_all);
router.post("/appointment/get", verify_staff, get_appointments);
router.post("/appointment/create", verify_staff, create_appointment);
router.delete("/appointment/delete/:id", verify_staff, delete_appointment);

// Managing Patients
router.post("/patient/get", verify_staff, get_patient);
router.post("/patient/delete", verify_staff, delete_patient);
router.patch("/patient/update", verify_staff, update_patient);
router.post("/patient/register", verify_staff, register_patient);

router.post("/doctor/get", verify_staff, get_doctor_by_name)

export default router;
