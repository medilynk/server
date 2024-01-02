import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { gen_staff_id, gen_doctor_id } from "../utilities/gen_id.js";

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

// Managing Staff
export const register_staff = async (req, res) => {
  try {
    let id = await gen_staff_id();
    const { first_name, last_name, email, password, phone } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password.toString(), salt);
    const createdStaff = await prisma.staff.create({
      data: {
        id: id,
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

export const update_staff = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const password = updateData.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(password, salt);
      updateData.password = passHash;
    }
    const updatedStaff = await prisma.staff.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    const staffData = { ...updatedStaff, password: undefined };
    res
      .status(200)
      .json({ message: "Staff account updated.", data: staffData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete_staff = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedStaff = await prisma.staff.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Staff deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const list_all_staff = async (req, res) => {
  try {
    const staffs = await prisma.staff.findMany(
      {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
        },
      },
      (err, result) => {
        if (err) throw err;
        return result;
      }
    );
    res.status(200).json({ message: "Fetched all staff.", data: staffs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get_staff_by_id = async (req, res) => {
  try {
    const { id } = req.body;
    const staff = await prisma.staff.findUnique({
      where: {
        id: id,
      },
    });
    const staffData = { ...staff, password: undefined };
    res.status(200).json({ message: "Fetched staff.", data: staffData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Managing Doctor
export const register_doctor = async (req, res) => {
  try {
    let id = await gen_doctor_id();
    const { first_name, last_name, email, phone, password, dept_id, shifts } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    const createdDoctor = await prisma.doctor.create({
      data: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: passHash,
        dept_id: dept_id,
        shifts: shifts,
      },
    });
    const doctorData = { ...createdDoctor, password: undefined };
    res.status(201).json({ message: "Doctor added.", data: doctorData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const update_doctor = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const password = updateData.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(password, salt);
      updateData.password = passHash;
    }
    const updatedDoctor = await prisma.doctor.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    const doctorData = { ...updatedDoctor, password: undefined };
    res
      .status(200)
      .json({ message: "Doctor account updated.", data: doctorData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete_doctor = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedDoctor = await prisma.doctor.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Doctor deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const list_all_doctors = async (req, res) => {
  try {
    // select all fields except password in prisma query
    const doctors = await prisma.doctor.findMany(
      {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
          dept_id: true,
          shifts: true,
        },
      },
      (err, result) => {
        if (err) throw err;
        return result;
      }
    );
    res.status(200).json({ message: "Fetched all doctors.", data: doctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get_doctor_by_id = async (req, res) => {
  try {
    const { id } = req.body;
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: id,
      },
    });
    const doctorData = { ...doctor, password: undefined };
    res.status(200).json({ message: "Fetched doctor.", data: doctorData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Managing Shift Table
export const list_all_shifts = async (req, res) => {
  try {
    const all_shifts = await prisma.shift_Doctor.findMany();
    res.status(200).json({ message: "Fetched all shifts.", data: all_shifts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get_shift_by_day = async (req, res) => {
  try {
    const { day } = req.body;
    const shift = await prisma.shift_Doctor.findMany({
      where: {
        day: {
          contains: day,
          mode: "insensitive",
        },
      },
    });
    res.status(200).json({ message: "Fetched shift.", data: shift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const add_shift = async (req, res) => {
  try {
    const { day, start_time, end_time } = req.body;
    const startTimeISO = new Date(`1970-01-01T${start_time}`).toISOString();
    const endTimeISO = new Date(`1970-01-01T${end_time}`).toISOString();
    const createdShift = await prisma.shift_Doctor.create({
      data: {
        day: day,
        start_time: startTimeISO,
        end_time: endTimeISO,
      },
    });
    res.status(201).json({ message: "Shift added.", data: createdShift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update_shift = async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;
    const updatedShift = await prisma.shift_Doctor.update({
      where: {
        id: id,
      },
      data: updatedData,
    });
    res.status(200).json({ message: "Shift updated.", data: updatedShift });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete_shift = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedShift = await prisma.shift_Doctor.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Shift deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
