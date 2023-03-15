import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const teacherOnSubject = await prisma.TeacherOnSubject.findMany();
    await Promise.all(
      teacherOnSubject.map(async (item) => {
        const subject = await prisma.Subject.findUnique({
          where: {
            id: item.subjectId,
          },
          select: {
            subjectName: true,
          },
        });
        item.subjectName = subject.subjectName;
      })
    );
    res.send(teacherOnSubject);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
