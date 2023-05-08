import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    if (req.query.ambulanceNumber) {
      await prisma.AmbulanceBooking.update({
        where: {
          id: req.query.id,
        },
        data: {
          ambulanceNumber: Number(req.query.ambulanceNumber),
          status: "approved",
        },
      });
    } else {
      await prisma.AmbulanceBooking.update({
        where: {
          id: req.query.id,
        },
        data: {
          status: "approved",
        },
      });
    }

    res.send("Request approved successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
