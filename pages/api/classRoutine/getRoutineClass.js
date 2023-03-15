import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const className = await prisma.ClassRoutine.findMany({
      select: {
        className: true,
      },
    });
    res.send(className);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
