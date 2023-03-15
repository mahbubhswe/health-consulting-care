import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const LatestNews = await prisma.LatestNews.findMany();
    res.send(LatestNews);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
