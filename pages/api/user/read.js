import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
