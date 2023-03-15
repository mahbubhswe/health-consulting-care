import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const payment = await prisma.payment.findMany();
    res.send(payment);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
