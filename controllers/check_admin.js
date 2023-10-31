import poll from "../db/psql";
import { create_admin } from "../db/admin";

export const check_admin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const query = {
    text: "SELECT * FROM Admin WHERE email=$1",
    values: [email],
  };
  const { rows } = await poll.query(query);
  if (rows.length == 0) {
    await create_admin();
  }
};
