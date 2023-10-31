import pool from "./psql";
import bcrypt from "bcrypt";

export const create_admin = async () => {
  try {
    const first_name = process.env.ADMIN_FIRST_NAME;
    const last_name = process.env.ADMIN_LAST_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    const query = {
      name: "create-admin",
      text: "INSERT INTO Admin(first_name, last_name, email, password) VALUES($1, $2, $3, $4)",
      valules: [first_name, last_name, email, passHash],
    };
    let db_res = await pool.query(query);
  } catch (error) {
    console.log(error);
  }
};
