import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const patient = await prisma.Patient.findMany();
    res.send(patient);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
