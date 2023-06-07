import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const fees = await prisma.fees.findMany();
    res.send(fees);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
