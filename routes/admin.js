import express from "express"
import { verify_admin } from "../middleware/auth.js"
import { add_dept } from "../controllers/admin.js"
const router = express.Router()

router.post("/add_dept", verify_admin, add_dept)

export default router
