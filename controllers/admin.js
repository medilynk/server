import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const add_dept = async (req, res) => {
  try {
    const { name } = req.body;
    const createdDept = await prisma.department.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ message: "Department created.", data: createdDept });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// REGISTER STAFF
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

//REGISTER DOCTOR
export const register_doctor = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, dept_id, shift } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    const createdDoctor = await prisma.doctor.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: passHash,
        dept_id: dept_id,
        shift: new Date(shift)
      },
    });
    const doctorData = { ...createdDoctor, password: undefined };
    res.status(201).json({ message: "Doctor added.", data: doctorData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};