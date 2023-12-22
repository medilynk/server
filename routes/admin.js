import express from "express";
import { verify_admin } from "../middleware/auth.js";
import { add_dept } from "../controllers/admin.js";
import {
  add_shift,
  delete_shift,
  update_shift,
  update_staff,
  update_doctor,
  register_staff,
  list_all_shifts,
  register_doctor,
} from "../controllers/admin.js";
const router = express.Router();

// Shifts routes
router.get("/shifts", verify_admin, list_all_shifts);
router.post("/shift/add", verify_admin, add_shift);
router.patch("/shift/update", verify_admin, update_shift);
router.delete("/shift/delete/:id", verify_admin, delete_shift);

// Department routes
router.post("/add_dept", verify_admin, add_dept);

// Managing Account Routes
router.post("/register/staff", verify_admin, register_staff);
router.patch("/update/staff", verify_admin, update_staff);
router.post("/delete/staff", verify_admin, update_staff);

router.post("/register/doctor", verify_admin, register_doctor);
router.patch("/update/doctor", verify_admin, update_doctor);
router.post("/delete/doctor", verify_admin, update_doctor);

export default router;
