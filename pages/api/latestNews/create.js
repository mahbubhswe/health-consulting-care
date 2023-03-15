import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await prisma.LatestNews.deleteMany();
    await prisma.LatestNews.create({
      data: req.body,
    });
    res.send("Latest news created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
