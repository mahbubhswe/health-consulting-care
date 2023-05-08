import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.Ambulance.update({
      where: {
        id: req.query.id,
      },
      data: {
        status: req.query.status == "booked" ? "free" : "booked",
      },
    });

    res.send("Request change successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
