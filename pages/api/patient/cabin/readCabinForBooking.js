import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const cabin = await prisma.Cabin.findMany({
      where: {
        status: "free",
      },
    });
    res.send(cabin);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
