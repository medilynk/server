import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// REGISTER
export const register_staff = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password.toString(), salt);
    const createdStaff = await prisma.staff.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: passHash,
      },
    });
    const staffData = { ...createdStaff, password: undefined };
    return res.status(201).json({ message: "Staff added.", data: staffData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const register_doctor = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, dept_id, shift_id } =
      req.data;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    const createdDoctor = prisma.doctor.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: passHash,
        dept_id: dept_id,
        shift_id: shift_id,
      },
    });
    const doctorData = { ...createdDoctor, password: undefined };
    res.status(201).json({ message: "Doctor added.", data: doctorData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

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
      process.env.JWT_SECRET
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
      process.env.JWT_SECRET
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
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Login success.", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
