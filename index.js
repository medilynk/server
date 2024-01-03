import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import staffRoutes from "./routes/staff.js"
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctor.js"
import { check_admin } from "./controllers/check_admin.js";

check_admin();

// CONFIGS
dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const PORT = process.env.PORT || 4000;

// ROUTES
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes)
app.use("/staff", staffRoutes)
app.use("/doctor", doctorRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
