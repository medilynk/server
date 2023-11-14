import cors from "cors";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import { check_admin } from "./controllers/check_admin.js";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import apiRoutes from "./routes/api.js"

check_admin();

// CONFIGS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

// ROUTES
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes)
app.use("/api", apiRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
