import express from "express"
import { verify_doctor } from "../middleware/auth.js"
import { read_appointment_unique } from "../controllers/appointment.js"

const router = express.Router()

router.get("/appointments", verify_doctor, read_appointment_unique)

export default router