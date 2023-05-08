import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.Appointment.update({
      where: {
        id: req.query.id,
      },
      data: {
        status: "approved",
      },
    });

    res.send("Appointment approved successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
