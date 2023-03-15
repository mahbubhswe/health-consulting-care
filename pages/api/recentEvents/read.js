import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const recentEvents = await prisma.RecentEvents.findMany();
    res.send(recentEvents);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
