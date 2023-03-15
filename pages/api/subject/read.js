import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const subject = await prisma.subject.findMany({
      select: {
        id: true,
        subjectName: true,
        className: true,
        createdAt: true,
      },
    });
    res.send(subject);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
