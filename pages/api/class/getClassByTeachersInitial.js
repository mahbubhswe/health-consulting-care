import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const classList = await prisma.TeacherOnSubject.findMany({
      where: {
        teacherInitial: req.query.teacherInitial,
      },
      select: {
        className: true,
      },
    });
    res.send(classList);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
