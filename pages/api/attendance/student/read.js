import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const StudentAttendance = await prisma.StudentAttendance.findMany();
    res.send(StudentAttendance);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
