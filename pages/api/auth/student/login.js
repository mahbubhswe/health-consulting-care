import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../utils/db";
import { studentSignToken } from "../../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const student = await prisma.student.findUnique({
      where: { studentId: req.query.studentId },
    });

    if (student && bcryptjs.compareSync(req.query.password, student.password)) {
      const token = studentSignToken(student);
      res.send({
        token,
        name: student.name,
        studentId: student.studentId,
      });
    } else if (student) {
      res.send("Invalid student id or password");
    } else {
      res.send("Sorry, no student exists with this student id");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
