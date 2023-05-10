import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const ambulance = await prisma.AmbulanceBooking.findMany({
      where: {
        phone: req.query.phone,
      },
    });
    res.send(ambulance);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
