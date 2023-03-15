import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.payment.update({
      where: {
        id: req.query.id,
      },
      data: {
        amount: { increment: Number(req.query.amount) },
      },
    });
    res.send("Amount has been updated successfully for this payment");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
