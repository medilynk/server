import bcrypt from "bcrypt";
import pool from "../db/psql";
import jwt from "jsonwebtoken";

// REGISTER
export const register_staff = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password.toString(), salt);
    const query = {
      name: "add-staff",
      text: "INSERT INTO Staff(first_name, last_name, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, phone",
      values: [first_name, last_name, email, passHash, phone],
    };
    let db_res = await pool.query(query);
    const createdData = {
      id: db_res.rows[0].id,
      first_name: db_res.rows[0].first_name,
      last_name: db_res.rows[0].last_name,
      email: db_res.rows[0].email,
      phone: db_res.rows[0].phone,
    };
    return res.status(201).json({ message: "Staff added.", data: createdData });
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
    const query = {
      name: "add-doctor",
      text: "INSERT INTO Doctor(first_name, last_name, email, phone, password, dept_id, shift_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, first_name, last_name, email, phone, dept_id, shift_id",
      values: [
        first_name,
        last_name,
        email,
        phone,
        passHash,
        dept_id,
        shift_id,
      ],
    };
    let db_res = await pool.query(query);
    const createdData = {
      id: db_res.rows[0].id,
      first_name: db_res.rows[0].first_name,
      last_name: db_res.rows[0].last_name,
      email: db_res.rows[0].email,
      phone: db_res.rows[0].phone,
      dept_id: db_res.rows[0].dept_id,
      shift_id: db_res.rows[0].shift_id,
    };
    res.status(201).json({ message: "Doctor added.", data: createdData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const register_patient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    const query = {
      name: "add-patient",
      text: "INSERT INTO Patient(first_name, last_name, email, phone) VALUES($1, $2, $3, $4)",
      values: [first_name, last_name, email, phone],
    };
    let db_res = await pool.query(query);
    res.status(201).json({ message: "Patient added.", data: db_res.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// LOGINS
export const login_staff = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT id,password FROM Staff WHERE email=$1";
    const values = [password];
    let db_query = await pool.query(query, values);
    const validated = bcrypt.compare(password, db_query.rows[0].password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { id: db_query.rows[0].id, type: "staff" },
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
    const query = "SELECT id,password FROM Doctor WHERE email=$1";
    const values = [password];
    let db_query = await pool.query(query, values);
    const validated = bcrypt.compare(password, db_query.rows[0].password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { id: db_query.rows[0].id, type: "doctor" },
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
    const query = "SELECT id,password FROM Admin WHERE email=$1";
    const values = [password];
    let db_query = await pool.query(query, values);
    const validated = bcrypt.compare(password, db_query.rows[0].password);
    if (!validated) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { id: db_query.rows[0].id, type: "admin" },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Login success.", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
