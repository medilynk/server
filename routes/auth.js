import express from "express";
import {
  login_doctor,
  login_staff,
  login_admin,
  register_patient,
} from "../controllers/auth.js";

import {  verify_staff } from "../middleware/auth.js";

const router = express.Router();


router.post("/register/patient", verify_staff, register_patient);
router.post("/login/staff", login_staff );
router.post("/login/doctor", login_doctor);
router.post("/login/admin", login_admin);


export default router;
