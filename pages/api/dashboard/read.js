import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const doctor = await prisma.Doctor.count();
    const patient = await prisma.Patient.count();
    const bloodBank = await prisma.BloodBank.count();
    const patientReport = await prisma.PatientReport.count();
    const obj = {
      doctor: doctor ? doctor : 0,
      patient: patient ? patient : 0,
      bloodBank: bloodBank ? bloodBank : 0,
      patientReport: patientReport ? patientReport : 0,
    };
    res.send(obj);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
