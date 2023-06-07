import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const patientReport = await prisma.PatientReport.findMany();
    res.send(patientReport);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
