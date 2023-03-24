import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const bloodDoner = await prisma.BloodBank.findMany();
    res.send(bloodDoner);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
