import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.ambulance.update({
      where: {
        ambulanceNumber: Number(
          req.query.updatedAmbulanceNumber
            ? req.query.updatedAmbulanceNumber
            : req.query.ambulanceNumber
        ),
      },
      data: {
        ambulanceNumber: Number(
          req.query.updatedAmbulanceNumber
            ? req.query.updatedAmbulanceNumber
            : req.query.ambulanceNumber
        ),
        status: "booked",
      },
    });
    await prisma.AmbulanceBooking.update({
      where: {
        id: req.query.id,
      },
      data: {
        ambulanceNumber: Number(
          req.query.updatedAmbulanceNumber
            ? req.query.updatedAmbulanceNumber
            : req.query.ambulanceNumber
        ),
        status: "approved",
      },
    });

    res.send("Request approved successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
