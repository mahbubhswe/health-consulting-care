import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const appointment = await prisma.Appointment.findMany();
    res.send(appointment);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
