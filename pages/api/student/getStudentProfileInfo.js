import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        studentId: req.query.studentId,
      },
    });
    res.send(student);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
