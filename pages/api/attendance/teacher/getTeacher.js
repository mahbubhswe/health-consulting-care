import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const teacher = await prisma.Teacher.findMany({
      select: {
        id:true,
        name: true,
        teacherInitial: true,
      },
    });
    res.send(teacher);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
