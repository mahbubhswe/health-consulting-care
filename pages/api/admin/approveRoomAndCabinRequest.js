import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.Cabin.update({
      where: {
        roomAndCabinNumber: req.query.updatedRoomAndCabinNumber
          ? req.query.updatedRoomAndCabinNumber
          : req.query.roomAndCabinNumber,
      },
      data: {
        roomAndCabinNumber: req.query.updatedRoomAndCabinNumber
          ? req.query.updatedRoomAndCabinNumber
          : req.query.roomAndCabinNumber,
        status: "booked",
      },
    });
    await prisma.CabinBooking.update({
      where: {
        id: req.query.id,
      },
      data: {
        roomAndCabinNumber: req.query.updatedRoomAndCabinNumber
          ? req.query.updatedRoomAndCabinNumber
          : req.query.roomAndCabinNumber,
        status: "approved",
      },
    });

    res.send("Request approved successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
