import express from "express"
import { verify_admin } from "../middleware/auth.js"
import { add_dept } from "../controllers/admin.js"
import { register_staff, register_doctor } from "../controllers/admin.js";
const router = express.Router()

router.post("/add_dept", verify_admin, add_dept)
router.post("/register/staff", verify_admin, register_staff);
router.post("/register/doctor", verify_admin, register_doctor);
export default router
