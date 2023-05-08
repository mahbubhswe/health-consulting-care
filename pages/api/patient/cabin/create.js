import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await prisma.CabinBooking.create({
      data: {
        ...req.body,
      },
    });

    res.send("Cabin booking request has been sent successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
