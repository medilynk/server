import fs from "fs";
import PDFDocument from "pdfkit";

export const gen_prescription = (created_prescription) => {
  const pdfDoc = new PDFDocument();
  const prescription_id = created_prescription.id.split("/")[2];
  const date = new Date(created_prescription.date_prescribed).getDate();
  const month = new Date(created_prescription.date_prescribed).getMonth() + 1;
  const year = new Date(created_prescription.date_prescribed).getFullYear();
  const formattted_date = `${date}-${month}-${year}`;
  const pdfPath = `/tmp/prescription_${prescription_id}_${formattted_date}.pdf`;
  pdfDoc.pipe(fs.createWriteStream(pdfPath));
  pdfDoc
    .fontSize(14)
    .text(`Prescription ID: ${created_prescription.id}`, 50, 50)
    .text(`Patient ID: ${created_prescription.patient.id}`, 50, 70)
    .text(
      `Patient Name: ${created_prescription.patient.first_name} ${created_prescription.patient.last_name}`,
      50,
      90
    )
    .text(`Doctor ID: ${created_prescription.doctor_id}`, 50, 110)
    .text(
      `Doctor Name: ${created_prescription.doctor.first_name} ${created_prescription.doctor.last_name}`,
      50,
      130
    )
    .text("Medications:", 50, 150);

  created_prescription.medications.forEach((medication, index) => {
    pdfDoc
      .text(
        `${index + 1}. Medication Name: ${medication.name}`,
        70,
        170 + index * 60
      )
      .text(`   Dosage: ${medication.dosage}`, 70, 190 + index * 60)
      .text(
        `   Instructions: ${medication.instructions}`,
        70,
        210 + index * 60
      );
  });
  pdfDoc
    .text(
      `Instructions: ${created_prescription.instructions}`,
      50,
      150 + created_prescription.medications.length * 90
    )
    .text(
      `Date Prescribed: ${created_prescription.date_prescribed}`,
      50,
      170 + created_prescription.medications.length * 60
    );
  pdfDoc.end();
  return pdfPath;
};
