import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const classList = await prisma.class.findMany({
      select: {
        id: true,
        className: true,
      },
    });
    res.send(classList);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
