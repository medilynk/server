import express from 'express';
import { verify_doctor, verify_staff } from '../middleware/auth';
import { createAppointment,
    delete_appointment,
    read_appointment_all,
    read_appointment_unique,
    update_appointment } from '../controllers/appointment';

const router = express.Router();

router.post("/api/appointment/create", verify_staff, createAppointment);
router.patch("/api/appointment/update", verify_staff, update_appointment);
router.delete("/api/appointment/delete", verify_staff, delete_appointment);
router.get("api/appointment/", verify_staff, read_appointment_all);

//doctor appointment

router.get('/api/appointment/doctor/:id',verify_doctor, read_appointment_unique )

export default router;