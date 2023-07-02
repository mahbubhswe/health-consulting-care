import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const prescription = await prisma.Prescription.findUnique({
      where: {
        id: req.query.id,
      },
    });
    const doctor = await prisma.Doctor.findUnique({
      where: {
        email: req.query.email,
      },
    });
    res.send({ prescription, doctor });
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
