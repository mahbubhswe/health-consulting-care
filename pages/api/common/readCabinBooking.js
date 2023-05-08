import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const cabinBooking = await prisma.CabinBooking.findMany();
    res.send(cabinBooking);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
