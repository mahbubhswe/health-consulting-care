import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const student = await prisma.Student.findMany({
      where: {
        className: req.query.className,
      },
      select: {
        name: true,
        studentId: true,
      },
    });
    const subject = await prisma.Subject.findMany({
      where: {
        className: req.query.className,
      },
      select: {
        id: true,
        subjectName: true,
      },
    });

    res.send({ student, subject });
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
