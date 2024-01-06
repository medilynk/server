import fs from "fs";
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
  async sendWelcomeEmailToPatient(user) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: `Hello ${user.first_name}!.`,
      text: `Hello ${user.first_name}! ${user.last_name}! \n You are registered.`,
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendAppointmentEmail(data) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: data.patient.email,
      subject: `Hello ${data.patient.first_name}! Your appointment has been scheduled.`,
      text: `Hello ${data.patient.first_name} ${data.patient.last_name}! \n Your appointment with Doctor ${data.doctor.first_name} ${data.doctor.last_name} has been scheduled on ${data.scheduled_date}.`,
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendReScheduledAppointmentEmail(data) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: data.patient.email,
      subject: `Hello ${data.patient.first_name}! Your appointment has been rescheduled.`,
      text: `Hello ${data.patient.first_name} ${data.patient.last_name}! \n Your appointment with Doctor ${data.doctor.first_name} ${data.doctor.last_name} has been rescheduled on ${data.scheduled_date}.`,
    };
    await this.transporter.sendMail(mailOptions);
  }
  async sendPrescriptionEmail(data, pdfPath) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: data.patient.email,
      subject: `Hello ${data.patient.first_name}! Your prescription has been generated.`,
      text: `Hello ${data.patient.first_name} ${data.patient.last_name}! \n Your prescription has been generated.`,
      attachments: [
        {
          filename: pdfPath.split("/")[2],
          path: pdfPath,
        },
      ],
    };
    await this.transporter.sendMail(mailOptions);
    fs.unlinkSync(pdfPath);
  } 
}

export default Mailer;
