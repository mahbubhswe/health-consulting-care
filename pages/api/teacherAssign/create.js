import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check this record exist or not
    const isExist = await prisma.TeacherOnSubject.findMany({
      where: {
        AND: [
          { subjectId: req.body.subjectId },
          { className: req.body.className },
          { teacherInitial: req.body.teacherInitial },
        ],
      },
    });
    if (isExist.length > 0) {
      res.send(
        "Sorry, this subject already assigned to this teacher in the same class"
      );
    } else {
      await prisma.TeacherOnSubject.create({
        data: {
          subjectId: req.body.subjectId,
          className: req.body.className,
          teacherInitial: req.body.teacherInitial,
        },
      });
      res.send("Teacher assigned successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
