import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
      const Subject = await prisma.Subject.findMany({
        where: {
          className: req.query.className,
        },
        select: {
          subjectName: true,
        },
      });
    res.send(Subject);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
