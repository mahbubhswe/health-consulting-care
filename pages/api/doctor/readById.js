import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const doctor = await prisma.Doctor.findUnique({
      where: {
        id: req.query.id,
      },
    });
    res.send(doctor);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
