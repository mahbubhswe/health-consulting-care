import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const subject = await prisma.subject.findMany({
      where: {
        className: req.query.className,
      },
      select: {
        id: true,
        subjectName: true,
      },
    });
    res.send(subject);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
