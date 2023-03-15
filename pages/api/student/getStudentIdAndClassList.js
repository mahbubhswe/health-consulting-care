import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const student = await prisma.student.count();
    const classList = await prisma.class.findMany({
      select: {
        className: true,
      },
    });
    let newSerial = student ? student + 1 : 1;
    let newStudentId = new Date().getFullYear() + "-" + newSerial;
    res.send({ newStudentId, classList });
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
