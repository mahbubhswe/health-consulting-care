import nc from "next-connect";
import { prisma } from "../../../../utils/db.js";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const ambulanceBooking = await prisma.AmbulanceBooking.findMany({
      where: {
        status: "free",
      },
    });
    res.send(ambulanceBooking);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
