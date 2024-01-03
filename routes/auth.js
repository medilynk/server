import express from "express";
import {
  login_doctor,
  login_staff,
  login_admin,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login/admin", login_admin);
router.post("/login/staff", login_staff );
router.post("/login/doctor", login_doctor);

export default router;
