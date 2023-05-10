import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const doctorPhone = `+${req.query.doctorPhone.replace(/\s/g, "")}`;
    const appointment = await prisma.Appointment.findMany({
      where: {
        doctorPhone: doctorPhone,
      },
    });

    res.send(appointment);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
