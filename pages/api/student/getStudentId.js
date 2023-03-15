import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const studentIdList = await prisma.student.findMany({
      select: {
        studentId: true,
      },
    });
    res.send(studentIdList);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
