import express from "express";
import { verify_admin } from "../middleware/auth.js";
import { add_dept, delete_staff } from "../controllers/admin.js";
import {
  add_shift,
  delete_shift,
  update_shift,
  update_staff,
  update_doctor,
  list_all_staff,
  register_staff,
  list_all_shifts,
  register_doctor,
  get_staff_by_id,
  get_doctor_by_id,
  list_all_doctors,
  get_shift_by_day,
} from "../controllers/admin.js";
const router = express.Router();

// Shifts routes
router.post("/shift/add", verify_admin, add_shift);
router.get("/shifts", verify_admin, list_all_shifts);
router.patch("/shift/update", verify_admin, update_shift);
router.post("/shifts/day", verify_admin, get_shift_by_day);
router.delete("/shift/delete/:id", verify_admin, delete_shift);

// Department routes
router.post("/add_dept", verify_admin, add_dept);

// Managing Account Routes
router.get("/all/staffs", verify_admin, list_all_staff);
router.post("/delete/staff", verify_admin, delete_staff);
router.post("/get/staff", verify_admin, get_staff_by_id);
router.patch("/update/staff", verify_admin, update_staff);
router.post("/register/staff", verify_admin, register_staff);

router.post("/delete/doctor", verify_admin, update_doctor);
router.get("/all/doctors", verify_admin, list_all_doctors);
router.post("/get/doctor", verify_admin, get_doctor_by_id);
router.patch("/update/doctor", verify_admin, update_doctor);
router.post("/register/doctor", verify_admin, register_doctor);

export default router;
