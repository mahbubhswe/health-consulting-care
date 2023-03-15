import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const teacherAttendance = await prisma.TeacherAttendance.findMany();
    res.send(teacherAttendance);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
