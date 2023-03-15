import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check this record exist or not
    const isExist = await prisma.exam.findMany({
      where: {
        AND: [
          { studentId: req.body.studentId },
          { className: req.body.className },
          { subjectName: req.body.subjectName },
        ],
      },
    });
    if (isExist.length > 0) {
      res.send("Sorry, marks of this subject for this student already exists");
    } else {
      await prisma.exam.create({
        data: {
          studentId: req.body.studentId,
          className: req.body.className,
          subjectId: req.body.subjectId,
          subjectName: req.body.subjectName,
          marks: Number(req.body.marks),
          outOfMarks: Number(req.body.outOfMarks),
        },
      });
      res.send("Marks saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
