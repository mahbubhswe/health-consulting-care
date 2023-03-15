import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const group = await prisma.group.findMany();
    res.send(group);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
