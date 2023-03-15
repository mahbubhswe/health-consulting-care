import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const classRoutine = await prisma.ClassRoutine.findMany({
      include: {
        daySubjectAndTime: true,
      },
    });
    res.send(classRoutine);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
