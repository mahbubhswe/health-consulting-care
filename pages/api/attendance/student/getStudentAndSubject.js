import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const teacher = await prisma.Class.findUnique({
      where: {
        className: req.query.className,
      },
      select: {
        subject: {
          select: {
            id: true,
            subjectName: true,
          },
        },
        student: {
          select: {
            name: true,
            studentId: true,
          },
        },
      },
    });
    res.send(teacher);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
