import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




export const register_patient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    const createdPatient = await prisma.patient.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
      },
    });
    res.status(201).json({ message: "Patient added.", data: createdPatient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// LOGINS
export const login_staff = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await prisma.staff.findUnique({
      where: {
        email: email,
      },
    });
    if (!staff)
      return res.status(403).json({ message: "Invalid Credentials!" });
    const validated = await bcrypt.compare(password, staff.password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { id: staff.id, type: "staff" },
      process.env.JWT_SECRET,
      {expiresIn:"1w"}
    );
    res.status(200).json({ message: "Login success.", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const login_doctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await prisma.doctor.findUnique({
      where: {
        email: email,
      },
    });
    if (!doctor)
      return res.status(403).json({ message: "Invalid Credentials!" });
    const validated = await bcrypt.compare(password, doctor.password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { id: doctor.id, type: "doctor" },
      process.env.JWT_SECRET,
      {expiresIn:"1w"}
    );
    res.status(200).json({ message: "Login success.", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const login_admin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin)
      return res.status(403).json({ message: "Invalid Credentials!" });
    const validated = await bcrypt.compare(password, admin.password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { id: admin.id, type: "admin" },
      process.env.JWT_SECRET,
      {expiresIn:"1w"}
    );
    res.status(200).json({ message: "Login success.", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
