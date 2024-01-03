import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secureConnection: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

class Mailer {
  constructor() {
    this.transporter = transporter;
  }
  async sendWelcomeEmail(user) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: `Hello ${user.first_name}! Your account has been created in HMS.`,
      text: `Hello ${user.first_name}! \n This is your authentiation details, don't share it with anyone. \n Email: ${user.email} \n Password: ${user.password}.`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export default Mailer;
