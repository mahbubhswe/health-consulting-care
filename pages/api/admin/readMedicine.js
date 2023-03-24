import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const medicine = await prisma.Medicine.findMany();
    res.send(medicine);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
