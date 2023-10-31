import express from "express";
import {
  login_doctor,
  login_staff,
  login_admin,
  register_doctor,
  register_patient,
  register_staff,
} from "../controllers/auth";
import { verify_admin, verify_staff, verify_doctor } from "../middleware/auth";
const router = express.Router();

router.post("/register/staff", verify_admin, register_staff);
router.post("/register/doctor", verify_admin, register_doctor);
router.post("/register/patient", verify_staff, register_patient);
router.post("/login/staff", login_staff);
router.post("/login/doctor", login_doctor);
router.post("/login/admin", login_admin);

export default router;
