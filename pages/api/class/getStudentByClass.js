import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const student = await prisma.Class.findUnique({
      where: {
        className: req.query.className,
      },
      select: {
        student: {
          select: {
            id: true,
            name: true,
            studentId: true,
          },
        },
      },
    });
    res.send(student);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
